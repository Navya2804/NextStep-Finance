from flask import Flask

load_dotenv()
app = Flask(__name__)

# Retrieve from environment variables
OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY')
OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT')

@app.route('/generate', methods=['POST'])
def chat():
    headers = {
        'api-key': OPENAI_API_KEY,
        'Content-Type': 'application/json'
    }

    data = request.json
    prompt = data.get('prompt', '')

    payload = {
        "prompt": prompt,
        "max_tokens": 100,
        "temperature": 0.7,
        "model": "gpt-3.5-turbo"  # or your deployed model
    }

    response = requests.post(f"{OPENAI_ENDPOINT}/openai/deployments/chat-master/completions", headers=headers,
                             json=payload)
    return jsonify(response.json())

@app.route('/')
def hello():
    return 'Hello, World!'