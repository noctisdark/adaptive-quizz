from base import app, db
from flask import jsonify
# from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  email = db.Column(db.String(50))

# Create table it it donesn't exist
with app.app_context():
  User.__table__.create(db.engine, checkfirst=True)
  
# Checkout the doc for building safe strings https://docs.sqlalchemy.org/en/20/orm/quickstart.html
# Example using hybrid property as a class method User: https://docs.sqlalchemy.org/en/20/orm/extensions/hybrid.html
  # Using 
  # @hybrid_property
  # def is_admin(self) -> bool:
  #  return self.id == 0
# This builds a queries similar to : SELECT * FROM users WHERE id == 0


# Define public queries and more complex methods
def all():
  users = User.query.all()
  user_list = []
  for user in users:
    user_dict = {'name': user.name, 'email': user.email}
    user_list.append(user_dict)
  return jsonify(user_list)

