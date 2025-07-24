import sqlite3

def get_chat_history(user_id):
    conn = sqlite3.connect('chat_history.db')
    cursor = conn.cursor()
    cursor.execute("SELECT role, message FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC", (user_id,))
    history = cursor.fetchall()
    conn.close()
    return [{"role": row[0], "content": row[1]} for row in history]

def get_transaction_summary(user_id, timeframe):
    conn = sqlite3.connect('data/transactions.db')
    cursor = conn.cursor()

    if timeframe == 'monthly':
        cursor.execute("SELECT SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END), SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', 'now')", (user_id,))
    elif timeframe == 'quarterly':
        cursor.execute("SELECT SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END), SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-3 months'))", (user_id,))
    elif timeframe == 'half-yearly':
        cursor.execute("SELECT SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END), SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-6 months'))", (user_id,))
    elif timeframe == 'yearly':
        cursor.execute("SELECT SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END), SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-01-01', 'now')", (user_id,))
    else:
        raise ValueError("Invalid timeframe")

    inflow, outflow = cursor.fetchone()
    conn.close()

    result = {
        "total_revenew": inflow,
        "total_expense": outflow,
        "profit_loss": inflow - outflow,
        "closing_balance": 150000
    }

    return result
    