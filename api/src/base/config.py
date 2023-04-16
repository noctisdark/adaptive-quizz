import os
from dotenv import load_dotenv
load_dotenv()

development = True if os.getenv('ENV') == 'development' else False
print("developement:", development)

class Config:
  SECRET_KEY = os.getenv('SECRET_KEY') or 'hard_to_guess_string'
  SQLALCHEMY_DATABASE_URI = 'sqlite:////api/data/db.sqlite'
  SQLALCHEMY_TRACK_MODIFICATIONS = development
  DEBUG = development
  UPLOAD_FOLDER = "/api/data/uploads"