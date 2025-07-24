from flask import Flask
import os
from dotenv import load_dotenv
from flask import request, jsonify
from openai import AzureOpenAI
import json
from flask_cors import CORS
import sqlite3

# Load environment variables from .env file
load_dotenv()
app = Flask(__name__)
# Allow all CORS requests
CORS(app)

# Retrieve from environment variables
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

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            role TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

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
    
    

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
