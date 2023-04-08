import os

class Config:
  SECRET_KEY = os.getenv('FLASK_APP') or 'hard_to_guess_string'
  SQLALCHEMY_DATABASE_URI = 'sqlite:////api/data/db.sqlite'
  SQLALCHEMY_TRACK_MODIFICATIONS = True if os.getenv('DEBUG') else False
  DEBUG = True if os.getenv('DEBUG') else False