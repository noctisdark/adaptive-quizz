from base import app
from models import User

# Define needed routes for user
@app.route('/users')
def get_users():
  return User.all()