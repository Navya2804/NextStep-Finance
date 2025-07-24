import sqlite3
import os
import pathlib
import pandas
import shutil

def init_db():
    shutil.rmtree("sql")
    os.mkdir("sql")
    conn = sqlite3.connect("sql/database.db")
    insert_all_tables(conn)

    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            role TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def insert_table_to_sqlite(filepath, conn):
    file_path = pathlib.Path(filepath)
    df = pandas.read_excel(filepath)
    table_name = file_path.stem
    df.to_sql(table_name, conn)


def insert_all_tables(conn):
    for dirpath, _, filenames in os.walk("data"):
        for file in filenames:
            pathname = os.path.join(dirpath, file)
            if (pathname.endswith(".xlsx")):
                insert_table_to_sqlite(pathname, conn)



