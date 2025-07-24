from app import app
from flask import request
from database.reader import get_transaction_summary

@app.route('/budget/summary', methods=['GET'])
def summary():
    # Read 2 string query parameters called lang and timeframe
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    print(lang, timeframe)

    return get_transaction_summary(user_id, timeframe)
