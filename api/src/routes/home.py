from base import app

@app.route('/')
def home():
  return "Hello, checkout /users"