from pyexpat.errors import messages

from app import app
import os
import json
from dotenv import load_dotenv
from flask import request
from openai import AzureOpenAI
from database.writer import save_chat_message
from database.reader import *


# Load environment variables from .env file
load_dotenv()
OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY')
OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT')
AZURE_OPENAI_DEPLOYMENT_NAME = os.getenv('AZURE_OPENAI_DEPLOYMENT_NAME')

@app.route('/chat', methods=['POST'])
def chat():
    # Use openAI client library to send response to the prompt sent to this request

    client = AzureOpenAI(
        api_key=OPENAI_API_KEY,
        azure_endpoint=OPENAI_ENDPOINT,
        api_version="2024-12-01-preview"
    )

    data = request.json
    prompt = data.get('prompt', '')
    user_id = data.get('user_id', 'hariya-prasad')

    transaction_summery = get_transaction_summary(user_id, 'monthly')
    category_wise_revenue_summary = get_summery_by_category(user_id, 'monthly', 'Inflow')
    category_wise_expense_summary = get_summery_by_category(user_id, 'monthly', 'Outflow')

    messages = [{'role': 'system', 'content': """
    Purpose:
Assist users in analyzing financial transaction data, identifying trends or issues, and providing simple, actionable recommendations. All insights should be explained in simple, plain language — suitable even for kids or people with no finance background.
Tone & Clarity:
Use simple terminology and everyday examples.
Avoid jargon unless explained clearly.
Be supportive and friendly.
Use visual metaphors if helpful (e.g., “like a piggy bank,” “like buying snacks with your allowance”).
Functional Capabilities:
Transaction Pattern Analysis:
Spot increases or decreases in spending or income.
Highlight unusual or frequent transactions.
Detect categories where the user spends most (e.g., food, travel, shopping).
Suggest ways to save more, reduce spending, or optimize cash flow.
Provide budget tips or alerts (e.g., “You spent more on snacks this month”).
Trend Detection Over Time:
Compare current vs past months.
Flag potential future issues (e.g., recurring subscriptions, rising bills).
    """},
    {'role': 'system', 'content': f'transaction summery of last month is {json.dumps(transaction_summery)}'},
    {'role': 'system', 'content': f'category wise revenue summary of last month is {json.dumps(category_wise_revenue_summary)}'},
    {'role': 'system', 'content': f'category wise expense summary of last month is {json.dumps(category_wise_expense_summary)}'},
    {'role': 'system', 'content': 'Use above financial details to answer user queries wherever possible'}
    ]
    messages.extend(get_chat_history(user_id))
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT_NAME,
        messages=messages,
        temperature=1,
    )
    
    # save userid, request promt and response message in sqlite database
    response_content = json.loads(response.json()).get('choices')[0].get('message').get('content')
    
    save_chat_message(user_id, 'user', prompt)
    save_chat_message(user_id, 'assistant', response_content)
    
    return json.loads(response.json()).get('choices')[0].get('message').get('content')