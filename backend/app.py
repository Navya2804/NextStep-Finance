from flask import Flask
import os
from dotenv import load_dotenv
from flask import request, jsonify
from openai import AzureOpenAI
import json
from flask_cors import CORS

app = Flask(__name__)
# Allow all CORS requests
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'