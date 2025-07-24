from app import app
import sqlite3
import os
import json
from dotenv import load_dotenv
from flask import request
from openai import AzureOpenAI

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

    conn = sqlite3.connect('chat_history.db')
    cursor = conn.cursor()

    # Get the chat_history from sqlite for given user_id. messages should be in format {"role": <Role column value>, "content": "Message column value"}
    cursor.execute("SELECT role, message FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC", (user_id,))
    history = cursor.fetchall()
    messages = [{"role": row[0], "content": row[1]} for row in history]
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT_NAME,
        messages=messages,
        temperature=1,
    )
    
    # save userid, request promt and response message in sqlite database
    response_content = json.loads(response.json()).get('choices')[0].get('message').get('content')
    cursor.execute("INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
                   (user_id, 'user', prompt))
    cursor.execute("INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
                   (user_id, 'assistant', response_content))
    conn.commit()
    conn.close()
    
    return json.loads(response.json()).get('choices')[0].get('message').get('content')