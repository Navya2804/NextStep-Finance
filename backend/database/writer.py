import sqlite3

def save_chat_message(user_id, role, message):
    conn = sqlite3.connect("sql/database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
                   (user_id, role, message))
    conn.commit()
    conn.close()