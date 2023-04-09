import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Need this extension because Chromes blocks all requests  even on localhost
if os.getenv('ENV') == 'development': CORS(app)

db = SQLAlchemy(app)