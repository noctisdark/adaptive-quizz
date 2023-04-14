from base import app
from base.jwt import token_required
from flask import request, jsonify

from models import QuizSession

@app.route('/quiz_sessions', methods=['POST'])
@token_required
def create_session(current_user):
  result = QuizSession.create(current_user, request.json["quizId"])
  if not result["error"]:
    return jsonify(result["quiz_session"]), 200
  return result["error"], 400

@app.route('/quiz_sessions/complete', methods=['PATCH'])
@token_required
def complete_session(current_user):
  result = QuizSession.complete(current_user, request.json["quizSessionId"])
  if not result["error"]:
    return jsonify(result["quiz_session"]), 200
  return result["error"], 400

@app.route('/quiz_sessions/next', methods=['POST'])
@token_required
def next_question(current_user):
  result = QuizSession.next_question(current_user, request.json["quizSessionId"])
  if not result["error"]:
    return jsonify({
      "nextQuestion": result.get("next_question", None),
      "quizSession": result.get("quiz_session", None)
    }), 200
  return result["error"], 400

@app.route('/quiz_sessions/answer', methods=['POST'])
@token_required
def answer_question(current_user):
  result = QuizSession.answer_question(current_user, request.json["quizSessionId"], request.json["answer"])
  if not result["error"]:
    return jsonify({
      "nextQuestion": result.get("next_question", None),
      "quizSession": result.get("quiz_session", None)
    }), 200
  return result["error"], 400