import pandas as pd
import numpy as np
import holidays
from datetime import datetime

# ------------------ Config ------------------
np.random.seed(42)
start_date = pd.Timestamp.today().normalize() - pd.DateOffset(years=5)
end_date = pd.Timestamp.today().normalize() + pd.DateOffset(years=2)
indian_holidays = holidays.India(prov="MH")
base_revenue = 10000

# ------------------ Calendar Table ------------------
date_range = pd.date_range(start=start_date, end=end_date, freq='D')
calendar_df = pd.DataFrame({'date': date_range})

calendar_df['weekend'] = (calendar_df['date'].dt.dayofweek >= 5).astype(int)
calendar_df['public_holiday'] = calendar_df['date'].isin(indian_holidays).astype(int)

calendar_df['day_of_month'] = calendar_df['date'].dt.day
calendar_df['days_in_month'] = calendar_df['date'].dt.days_in_month
calendar_df['distance_from_start_of_month'] = calendar_df['day_of_month'] - 1
calendar_df['distance_from_end_of_month'] = calendar_df['days_in_month'] - calendar_df['day_of_month']
calendar_df.drop(columns=['day_of_month', 'days_in_month'], inplace=True)

# ------------------ Revenue Generation ------------------
revenue_dates = pd.date_range(start=start_date, end=datetime.today(), freq='D')
revenue_list = []

for d in revenue_dates:
    year_fraction = (d.year - start_date.year) + d.dayofyear / 365.0

    # Trend: 10% growth per year (inflation + income)
    trend = 1 + 0.10 * year_fraction

    # Seasonality
    if d.month in [10, 11]:  # Diwali
        season = 1.5
    elif d.month == 12:      # Christmas + winter
        season = 1.3
    elif d.month in [6, 7]:  # Monsoon sale
        season = 1.2
    elif d.month in [2, 3]:  # Low shopping months
        season = 0.8
    else:
        season = 1.0

    # Day effect
    is_weekend = d.weekday() >= 5
    is_holiday = d in indian_holidays
    day_boost = 1.0 + 0.2 * is_weekend + 0.3 * is_holiday

    # Month-end salary boost (last 2 days and first 3 days of month)
    day_of_month = d.day
    days_in_month = pd.Timestamp(d).days_in_month
    distance_from_end = days_in_month - day_of_month
    salary_boost = 1.0 + 0.2 * ((distance_from_end <= 2) or (day_of_month <= 3))

    # Noise
    noise = np.random.normal(loc=1.0, scale=0.1)

    # Final revenue
    revenue = base_revenue * trend * season * day_boost * salary_boost * noise
    revenue_list.append([d, round(max(0, revenue), 2)])

revenue_df = pd.DataFrame(revenue_list, columns=['date', 'revenue'])

# ------------------ Save to CSV ------------------
calendar_df.to_csv("calendar_table.csv", index=False)
revenue_df.to_csv("shop_revenue_data.csv", index=False)

print("Synthetic revenue data and calendar table generated.")
