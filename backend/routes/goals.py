import json

from app import app
from flask import request
from database.reader import get_profit_loss

from core import  chat

@app.route('/goals/get-daily-profit', methods=['GET'])
def get_daily_profit():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    return get_profit_loss(user_id, timeframe)



@app.route('/goals/get-trend-reason', methods=['GET'])
def get_trend_reason():
    user_id = request.args.get('user_id', 'default_user')
    lang = request.args.get('lang')
    timeframe = request.args.get('timeframe')

    print("porfit : ", json.dumps(get_profit_loss(user_id, timeframe)))
    context = []
    context.append({"role": "system", "content": f"daily-profit = {json.dumps(get_profit_loss(user_id, timeframe))}"})

    response = chat.chat(context, prompt= """
        Considering above daily-profit json. 
        \nGive us insight why this trend occurs\n Answer should be in 3 points
            \n1. Reason Heading
            \n2.Reason Summary
            \n3.Criticality of Reason.
            \n\n
            Give me four top reasons answer should be in such that small kids can understand. 
        Give me json with format {
            "insights" : [{
                "criticality" : <Criticality of Reason>,
                "heading" : <Reason Heading>,
                "summary" : <Reason Summary              
             }]
         }""")
    return json.loads(response)

