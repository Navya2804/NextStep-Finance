import json

from datetime import datetime, timedelta
from app import app, cache
from flask import request, make_response, jsonify
from database.reader import get_transaction_summary, get_summery_by_category, get_transaction_history

from core import chat


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


@app.route('/budget/budget-summary', methods=['GET'])
@cache.cached(timeout=24 * 60 * 60, query_string=True)
def get_budget_summary():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')
    context = []
    context.append({"role": "system", "content": f"budget_summary{timeframe} = {json.dumps(get_transaction_summary(user_id, timeframe))}"})

    context.append({"role": "system", "content": f"category_wise_revenue_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe,'Inflow'))}"})

    context.append({"role": "system", "content": f"category_wise_expense_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe, 'Outflow'))}"})

    response = chat.chat(context, prompt= """
        considering above budget_summary, category_wise_revenue_summary and category_wise_expense_summary
        \nGive us Summary of this Budget in one point
            \n1.Heading
            \n2.Summary 
            \n\n
            solutions answer should be in such that small kids can understand. Use more data to summarize the answer and summary should be of 2-3 lines
            only defined language should in specified language rest of them should be in english
        Give me json with format {
            "insights" : [\{
                "heading" : <Reason Heading in language $LANG$>,
                "summary" : <Reason Summary in language $LANG$>
             \}]
         }""".replace("$LANG$", lang))
    return json.loads(response)
