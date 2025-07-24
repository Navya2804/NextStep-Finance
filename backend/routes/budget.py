from app import app
from flask import request
from database.reader import get_transaction_summary, get_summery_by_category, get_transaction_history

@app.route('/budget/summary', methods=['GET'])
def summary():
    # Read 2 string query parameters called lang and timeframe
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    return get_transaction_summary(user_id, timeframe)

@app.route('/budget/expense-by-category', methods=['GET'])
def expense_by_category():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    return get_summery_by_category(user_id, timeframe, 'Outflow')

@app.route('/budget/revenue-by-category', methods=['GET'])
def revenue_by_category():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    return get_summery_by_category(user_id, timeframe, 'Inflow')

@app.route('/budget/transaction-history', methods=['GET'])
def transaction_history():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')
    page_size = int(request.args.get('page_size', 10))
    page_number = int(request.args.get('page_number', 1))


    return get_transaction_history(user_id, timeframe, page_number, page_size)