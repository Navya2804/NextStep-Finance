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
<<<<<<< HEAD
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
=======
    return 'Hello, World!'
>>>>>>> 0d9ee1ddf130362b501c786d9ac806606e062203
