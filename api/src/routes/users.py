from base import app
from flask import request, jsonify
from models import User

# Define needed routes for user
@app.route('/users')
def get_users():
  result = User.all()
  print(result)
  if not result["error"]:
    users = result["users"]
    return jsonify(users), 200
  else:
    return jsonify(result["error"]), 400

@app.route('/users/register', methods=['POST'])
def register_user():
  result = User.register(request.json)
  if not result["error"]:
    jwt = result["jwt"]
    return jsonify(jwt), 200
  else:
    return jsonify(result["error"]), 400

@app.route('/users/login', methods=['POST'])
def login_user():
  print("LOGIN REQUEST")
  result = User.login(request.json)
  if not result["error"]:
    jwt = result["jwt"]
    return jsonify(jwt), 200
  else:
    return jsonify(result["error"]), 400