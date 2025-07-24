from app import app
from flask import request
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from tensorflow.keras.models import load_model

# --- Load model and data ---
model = load_model("forecasting/models/lstm_revenue_model.h5")
scaler = joblib.load("forecasting/models/revenue_scaler.save")

revenue_df = pd.read_csv("forecasting/data/shop_revenue_data.csv", parse_dates=['date'])
calendar_df = pd.read_csv("forecasting/data/calendar_table.csv", parse_dates=['date'])

df = revenue_df.merge(calendar_df, on='date')
df['revenue_scaled'] = scaler.transform(df[['revenue']])
SEQ_LEN = 29


def generate_forecast(n=20):
    predictions = []

    # 1. Last 30 days of actuals
    recent_actuals = df.tail(30)
    for _, row in recent_actuals.iterrows():
        predictions.append({
            "date": row["date"].strftime("%Y-%m-%d"),
            "predicted_revenue": round(float(row["revenue"]), 2),
            "type": "actual"
        })

    # 2. Forecast next n days
    df_copy = df.copy()
    seq = df_copy['revenue_scaled'].iloc[-SEQ_LEN:].values.reshape(-1, 1)

    for _ in range(n):
        next_date = df_copy['date'].iloc[-1] + pd.Timedelta(days=1)

        cal_row = calendar_df[calendar_df['date'] == next_date]
        if cal_row.empty:
            break

        features = cal_row[['weekend', 'public_holiday', 'distance_from_start_of_month', 'distance_from_end_of_month']].values[0]

        pred_scaled = model.predict([seq.reshape(1, SEQ_LEN, 1), features.reshape(1, -1)], verbose=0)[0][0]
        pred = float(scaler.inverse_transform([[pred_scaled]])[0][0])

        predictions.append({
            "date": next_date.strftime("%Y-%m-%d"),
            "predicted_revenue": round(pred, 2),
            "type": "forecast"
        })

        # Update sequence and df
        seq = np.vstack([seq[1:], [[pred_scaled]]])
        df_copy = pd.concat([df_copy, pd.DataFrame({'date': [next_date], 'revenue_scaled': [pred_scaled]})], ignore_index=True)

    return predictions

@app.route("/forecast", methods=["GET"])
def forecast_endpoint():
    try:
        n = int(request.args.get("n", 20))
        result = generate_forecast(n)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
