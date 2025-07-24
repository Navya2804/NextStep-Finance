from app import app
from flask import Flask, request, jsonify
import pandas as pd
from datetime import datetime, timedelta


@app.route('/forecast', methods=['GET'])
def get_revenue_data():
    try:
        # Read period from query parameter (default 20 if not given)
        period = int(request.args.get('period', 20))

        # Load the CSV
        df = pd.read_csv('forecasting/data/shop_revenue_pune.csv')
        df['date'] = pd.to_datetime(df['date'])

        today = datetime.today().date()

        # Last 30 days of data
        last_30_days = df[df['date'] < pd.Timestamp(today)].sort_values(by='date').tail(30)

        # Forecast period data from today
        future_data = df[df['date'] >= pd.Timestamp(today)].sort_values(by='date').head(period)

        # Combine and format
        result = pd.concat([last_30_days, future_data])
        result['date'] = result['date'].dt.strftime('%Y-%m-%d')

        # Convert to JSON
        return jsonify(result[['date', 'revenue', 'public_holiday']].to_dict(orient='records'))

    except Exception as e:
        return jsonify({'error': str(e)}), 500
