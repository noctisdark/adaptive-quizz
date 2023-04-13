from base import app
from base.jwt import token_required
from flask import request

from models import QuizSession

@app.route('/quiz_session/create', methods=['POST'])
@token_required
def create_new_session(current_user):
  QuizSession.create(current_user, request["quiz_id"])
  