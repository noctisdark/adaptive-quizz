from base import app
from base.jwt import token_required
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

@app.route('/users/me', methods=['POST'])
@token_required
def get_user_data(current_user):  
  return jsonify(User.to_dict(current_user)), 200

@app.route('/users/me/image', methods=['POST'])
@token_required
def upload_image(current_user):
  if "image" in request.files:
    return jsonify(User.upload_image(current_user, request.files["image"])), 200
  return "No image supplied", 400

# Keep it simple for now
from flask import send_from_directory

@app.route('/uploads/<path:filename>', methods=['GET'])
def get_image(filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)