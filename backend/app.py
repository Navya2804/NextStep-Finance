from flask import Flask
import os
from dotenv import load_dotenv
from flask import request, jsonify
from openai import AzureOpenAI
import json
from flask_cors import CORS
from flask_caching import Cache

app = Flask(__name__)

# Configure cache (using SimpleCache for in-memory caching)
app.config['CACHE_TYPE'] = 'SimpleCache'
# app.config['CACHE_DEFAULT_TIMEOUT'] = 24 * 60 * 60  # Cache for 5 minutes (300 seconds)

cache = Cache(app)
# Allow all CORS requests
CORS(app)

@app.route('/')
def hello():
    return 'Hello, World!'