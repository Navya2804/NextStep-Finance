import json
from datetime import datetime, timedelta
from app import app, cache
from flask import request, make_response, jsonify
from database.reader import get_profit_loss

from core import  chat

from database.reader import get_transaction_history

from database.reader import get_summery_by_category


@app.route('/goals/get-daily-profit', methods=['GET'])
def get_daily_profit():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    return get_profit_loss(user_id, timeframe)



@app.route('/goals/trend-reason', methods=['GET'])
@cache.cached(timeout=24 * 60 * 60)
def get_trend_reason():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    context = []
    context.append({"role": "system", "content": f"day_wise_profit_loss_for_{timeframe} = {json.dumps(get_profit_loss(user_id, timeframe))}"})

    context.append({"role": "system", "content": f"category_wise_revenue_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe,'Inflow'))}"})

    context.append({"role": "system", "content": f"category_wise_expense_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe, 'Outflow'))}"})

    response = chat.chat(context, prompt= """
        considering above day_wise_profit_loss, category_wise_revenue_summary and category_wise_expense_summary
        \nGive us insight about, why this trend occurs\n Answer should be in 3 points
            \n1. Reason Heading
            \n2.Reason Summary
            \n3.Criticality of reason.
            \n\n
            Give me four top solutions answer should be in such that small kids can understand. Use more data to summarize the answer and summary should be of 2-3 lines
            only defined language should in specified language rest of them should be in english
        Give me json with format {
            "insights" : [\{
                "criticality" : <Criticality of Reason>,
                "heading" : <Reason Heading in language $LANG$>,
                "summary" : <Reason Summary in language $LANG$>
             \}]
         }""".replace("$LANG$", lang))
    return json.loads(response)

@app.route('/goals/trend-improvement', methods=['GET'])
@cache.cached(timeout=24 * 60 * 60)
def get_trend_improvement():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    context = []
    context.append({"role": "system", "content": f"day_wise_profit_loss_for_{timeframe} = {json.dumps(get_profit_loss(user_id, timeframe))}"})

    context.append({"role": "system", "content": f"category_wise_revenue_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe,'Inflow'))}"})

    context.append({"role": "system", "content": f"category_wise_expense_summary_for_{timeframe} = {json.dumps(get_summery_by_category(user_id, timeframe, 'Outflow'))}"})

    response = chat.chat(context, prompt= """
        considering above day_wise_profit_loss, category_wise_revenue_summary and category_wise_expense_summary
        \nGive us insight what can be improved to increase the profit\n Answer should be in 3 points
            \n1. Solution Heading
            \n2.Solution Summary
            \n3.Criticality of Solution.
            \n\n
            Give me four top solutions answer should be in such that small kids can understand. Use more data to summarize the answer and summary should be of 2-3 lines
            only defined language should in specified language rest of them should be in english
        Give me json with format {
            "insights" : [\{
                "criticality" : <Criticality of Reason>,
                "heading" : <solution Heading in language $LANG$>,
                "summary" : <solution Summary in language $LANG$>
             \}]
         }""".replace("$LANG$", lang))
    return json.loads(response)
