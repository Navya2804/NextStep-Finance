from app import app
import os
import json
from dotenv import load_dotenv
from flask import request
from openai import AzureOpenAI
from database.writer import save_chat_message
from database.reader import get_chat_history


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
    user_id = data.get('user_id', 'default_user')

    messages = get_chat_history(user_id)
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