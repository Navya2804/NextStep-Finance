import sqlite3

def get_chat_history(user_id):
    conn = sqlite3.connect("sql/database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT role, message FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC", (user_id,))
    history = cursor.fetchall()
    conn.close()
    return [{"role": row[0], "content": row[1]} for row in history]

def get_transaction_summary(user_id, timeframe):
    conn = sqlite3.connect("sql/database.db")
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

def get_profit_loss(user_id, timeframe):
    conn = sqlite3.connect('sql/database.db')
    cursor = conn.cursor()

    if timeframe == 'monthly':
        cursor.execute("SELECT 15000, SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END) - SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END), date FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', 'now') GROUP BY Date", (user_id,))
    elif timeframe == 'quarterly':
        cursor.execute("SELECT 82000, SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END) - SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END), date FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-3 months')) GROUP BY Date", (user_id,))
    elif timeframe == 'half-yearly':
        cursor.execute("SELECT 160000, SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END) - SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END), date FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-6 months')) GROUP BY Date", (user_id,))
    elif timeframe == 'yearly':
        cursor.execute("SELECT 235000, SUM(CASE WHEN transaction_type = 'Inflow' THEN Amount ELSE 0 END) - SUM(CASE WHEN transaction_type = 'Outflow' THEN Amount ELSE 0 END), date FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-01-01', 'now') GROUP BY Date", (user_id,))
    else:
        raise ValueError("Invalid timeframe")

    results = cursor.fetchall()
    data_array = []
    goal_amount = None
    for row in results:
        goal_amount, profit_sum, timestamp = row  # Unpack the row into variables
        # Create a dictionary for the current row
        data_entry = {
            'profit': profit_sum,
            'timestamp': timestamp
        }
        # Append the dictionary to the list
        data_array.append(data_entry)
    conn.close()

    result = {
        "goal_amount": goal_amount,
        "profit_datewise": data_array,
    }

    return result
    
def get_summery_by_category(user_id, timeframe, transaction_type):
    conn = sqlite3.connect("sql/database.db")
    cursor = conn.cursor()

    if timeframe == 'monthly':
        cursor.execute("SELECT category, SUM(amount) AS expense_amount FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', 'now') AND transaction_type = ? GROUP BY category ORDER BY category", (user_id, transaction_type))
    elif timeframe == 'quarterly':
        cursor.execute("SELECT category, SUM(amount) AS expense_amount FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-3 months')) AND transaction_type = ? GROUP BY category ORDER BY category", (user_id, transaction_type))
    elif timeframe == 'half-yearly':
        cursor.execute("SELECT category, SUM(amount) AS expense_amount FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-6 months')) AND transaction_type = ? GROUP BY category ORDER BY category", (user_id, transaction_type))
    elif timeframe == 'yearly':
        cursor.execute("SELECT category, SUM(amount) AS expense_amount FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-01-01', 'now') AND transaction_type = ? GROUP BY category ORDER BY category", (user_id, transaction_type))
    else:
        raise ValueError("Invalid timeframe")
    
    summary = cursor.fetchall()
    conn.close()
    
    results = [{'category': row[0], 'expense_amount': row[1]} for row in summary]

    return results

def get_transaction_history(user_id, timeframe, page_number=1, page_size=10):
    conn = sqlite3.connect("sql/database.db")
    cursor = conn.cursor()

    # Implement pagination in below queries
    offset = (page_number - 1) * page_size
    if timeframe == 'monthly':
        cursor.execute("SELECT (date || ' ' || time) AS timestamp, category, description, amount, transaction_type, party_involved FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', 'now') LIMIT ? OFFSET ?", (user_id, page_size, offset))
    elif timeframe == 'quarterly':
        cursor.execute("SELECT (date || ' ' || time) AS timestamp, category, description, amount, transaction_type, party_involved FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-3 months')) LIMIT ? OFFSET ?", (user_id, page_size, offset))
    elif timeframe == 'half-yearly':
        cursor.execute("SELECT (date || ' ' || time) AS timestamp, category, description, amount, transaction_type, party_involved FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-6 months')) LIMIT ? OFFSET ?", (user_id, page_size, offset))
    elif timeframe == 'yearly':
        cursor.execute("SELECT (date || ' ' || time) AS timestamp, category, description, amount, transaction_type, party_involved FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-01-01', 'now') LIMIT ? OFFSET ?", (user_id, page_size, offset))
    else:
        raise ValueError("Invalid timeframe")
    
    history = cursor.fetchall()
    conn.close()

    return {
        'total': get_transaction_count(user_id, timeframe),
        'transactions': [
            {
                'timestamp': row[0],
                'category': row[1],
                'description': row[2],
                'amount': row[3],
                'transaction_type': row[4],
                'party_involved': row[5]
            }
            for row in history
        ]
    }

def get_transaction_count(user_id, timeframe):
    conn = sqlite3.connect("sql/database.db")
    cursor = conn.cursor()

    if timeframe == 'monthly':
        cursor.execute("SELECT COUNT(1) as cnt FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', 'now')", (user_id,))
    elif timeframe == 'quarterly':
        cursor.execute("SELECT COUNT(1) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-3 months'))", (user_id,))
    elif timeframe == 'half-yearly':
        cursor.execute("SELECT COUNT(1) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-%m-01', date('now', '-6 months'))", (user_id,))
    elif timeframe == 'yearly':
        cursor.execute("SELECT COUNT(1) FROM transactions WHERE user_id = ? AND Date >= strftime('%Y-01-01', 'now')", (user_id,))
    else:
        raise ValueError("Invalid timeframe")
    
    count = cursor.fetchone()[0]
    conn.close()

    return count