from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)