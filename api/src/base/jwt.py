import re
import datetime
from functools import wraps
from flask import jsonify, request
import jwt
from . import app
from models.User import User

authorization_regex = re.compile("^Bearer (.*)$")

def token_required(f):
  @wraps(f)
  def decorator(*args, **kwargs):
    token = None
    if 'Authorization' in request.headers:
      authorization_header = request.headers["Authorization"]
      match = authorization_regex.match(authorization_header)
      if match[0]: token = match[0]

    if not token:
      return "Missing token", 403
    try:
      data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
      current_user = User.query.filter_by(id=data["id"]).first()
    except:
      return "Invalid token", 403

    return f(current_user, *args, **kwargs)
  return decorator