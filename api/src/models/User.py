import os
from uuid import uuid4
from base import app, db
from sqlalchemy import text
import datetime
import jwt
from models.UserQuizz import user_quizz
from werkzeug.utils import secure_filename

# from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(50))
  password = db.Column(db.String(64))
  image_url = db.Column(db.String(64))
  quizzes = db.relationship("Quizz", secondary=user_quizz, backref="users")

# Create table if it doesn't exist
with app.app_context():
  User.__table__.create(db.engine, checkfirst=True)
  user_quizz.create(db.engine, checkfirst=True)
  
# Checkout the doc for building safe strings https://docs.sqlalchemy.org/en/20/orm/quickstart.html
# Example using hybrid property as a class method User: https://docs.sqlalchemy.org/en/20/orm/extensions/hybrid.html
  # Using 
  # @hybrid_property
  # def is_admin(self) -> bool:
  #  return self.id == 0
# This builds a queries similar to : SELECT * FROM users WHERE id == 0

# Define public queries and more complex methods
def to_dict(user):
  return {"id": user.id, "username": user.username, "imageURL": user.image_url}

def all():
  users = User.query.all()
  user_list = []
  for user in users:
    user_dict = to_dict(user)
    user_list.append(user_dict)
  return {"error": None, "users": user_list}

def register(creds):
  # Check if username exists
  user = User.query.filter_by(username=creds['username']).first()
  if user:
    return {"error": f"username `{creds['username']}` already exists, try logging in or pick another one"}

  new_user = User(username=creds['username'], password=creds['password'])
  db.session.add(new_user)
  db.session.commit()

  # this must be bad
  jwt_duration = jwt_duration = datetime.timedelta(days=7) if creds['rememberMe'] else datetime.timedelta(minutes=45)
  encoded_jwt = jwt.encode(
    {'id' : new_user.id, 'exp' : datetime.datetime.utcnow() + jwt_duration},
    app.config['SECRET_KEY'], "HS256"
  )
  return {"error": None, "jwt": encoded_jwt}

def login(creds):
  user = User.query.filter_by(username=creds['username']).first()
  if not user:
    return {"error": f"No user with username `{creds['username']}`."}

  # A timing attack might be possible here
  if not user.password == creds['password']:
    return {"error": "Incorrect password."} 
  
  # this must be bad
  jwt_duration = datetime.timedelta(days=7) if creds['rememberMe'] else datetime.timedelta(minutes=45)
  encoded_jwt = jwt.encode(
    {'id' : user.id, 'exp' : datetime.datetime.utcnow() + jwt_duration},
    app.config['SECRET_KEY'], "HS256"
  )
  return {"error": None, "jwt": encoded_jwt}

def upload_image(user, file):
  filename = str(uuid4()) + '_' + secure_filename(file.filename)
  save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
  access_path = '/uploads/' + filename
  file.save(save_path)
  user.image_url = access_path
  db.session.add(user);
  db.session.commit()
  return access_path

def change_username(user, new_username):
  duplicate_username = User.query.filter_by(username=new_username).first()
  if duplicate_username:
    return {"error": "Sorry, that username is already taken."}
  user.username = new_username
  db.session.add(user);
  db.session.commit();
  return {};

def change_password(user, data):
  user_exists = User.query.filter_by(username=user.username, password=data['oldPassword']).first()
  if not user_exists:
    return {"error": f"Incorrect password for user {user.username}."}

  user.password = data['password']
  db.session.add(user);
  db.session.commit();
  return {};

def delete_account(user):
  user_exists = User.query.filter_by(username=user.username).first()
  if not user_exists:
    return {"error": f"No user with username {user.username}."}
  db.session.delete(user);
  db.session.commit();
  return {};