FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

# Use gunicorn for production and bind to 0.0.0.0:$PORT
CMD ["gunicorn", "--bind", "0.0.0.0:${PORT:-8080}", "app:app"]