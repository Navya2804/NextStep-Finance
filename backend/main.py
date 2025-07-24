import routes
from database import init_db
from app import app

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=8080)
