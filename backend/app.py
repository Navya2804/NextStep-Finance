from flask import Flask
import os
from dotenv import load_dotenv
from flask import request, jsonify
from openai import AzureOpenAI
import json
from flask_cors import CORS

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
def chat_v2():
    # Use openAI client library to send response to the prompt sent to this request

    client = AzureOpenAI(
        api_key=OPENAI_API_KEY,
        azure_endpoint=OPENAI_ENDPOINT,
        api_version="2024-12-01-preview"
    )

    data = request.json
    prompt = data.get('prompt', '')
    print(prompt)

    response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT_NAME,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=1,
    )

    return json.loads(response.json()).get('choices')[0].get('message').get('content')
    
    

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True)