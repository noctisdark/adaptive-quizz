from base import app
from base.jwt import token_required
from flask import jsonify, request, redirect, url_for
from models import Quiz


@app.route('/quizzes')
@token_required
def get_quizzes(current_user):
  result = Quiz.all(current_user)
  if not result["error"]:
    quizzes = result["quizzes"]
    return jsonify(quizzes), 200
  else:
    return jsonify(result["error"]), 400
  
@app.route('/quizzes', methods=['POST'])
@token_required
def create_quiz(current_user):
  result = Quiz.create(current_user, request.json)
  if not result["error"]:
    quiz = result["quiz"]
    return jsonify(quiz), 200
  else:
    return jsonify(result["error"]), 400
  
@app.route('/quizzes', methods=['PATCH'])
@token_required
def update_quiz(current_user):
  result = Quiz.update(current_user, request.json)
  if not result["error"]:
    quiz = result["quiz"]
    return jsonify(quiz), 200
  else:
    return jsonify(result["error"]), 400
  
@app.route('/questions', methods=['POST'])
@token_required
def create_question(current_user):
  result = Quiz.create_question(current_user, request.json["quiz_id"], request.json)
  if not result["error"]:
    question = result["question"]
    return jsonify(question), 200
  else:
    return jsonify(result["error"]), 400
  
@app.route('/questions', methods=['PATCH'])
@token_required
def update_question(current_user):
  result = Quiz.update_question(current_user, request.json)
  if not result["error"]:
    question = result["question"]
    return jsonify(question), 200
  else:
    return jsonify(result["error"]), 400

Quizz = Quiz
@app.route("/quizz/add", methods=["POST"])
def add_quizz():
  question = request.form["question"]
  answer = request.form["answer"]
  difficulty = request.form["difficulty"]
  quizz = Quizz.Quizz(question, answer, difficulty)
  if not quizz:
    return {"error": "Quizz not found"}, 400
  return jsonify(Quizz.db_add_quizz(quizz)), 200


@app.route("/quizz/del", methods=["POST"])
def del_quizz():
  id = request.form["id"]
  quizz = Quizz.Quizz.query.get(id)
  if not quizz:
    return {"error": "Quizz not found"}, 400
  return jsonify(Quizz.db_del_quizz(quizz)), 200


@app.route("/quizz/ask/<int:id>", methods=["GET"])
def ask_quizz(id):
  quizz = Quizz.Quizz.query.get(id)
  if not quizz:
    return {"error": "Quizz not found"}, 400
  dict = Quizz.quizz_to_dict(quizz)
  del dict["answer"]
  return jsonify({"error": None, "quizz": dict}), 200


@app.route("/quizz/answer/<int:id>", methods=["POST"])
def answer_quizz(id):
  quizz = Quizz.Quizz.query.get(id)
  answer = request.form["answer"]
  result = Quizz.transition(quizz, answer)
  if result["error"]:
    return jsonify(result["error"]), 400
  else:
    return redirect(url_for("ask_quizz", id=result["quizz"]["id"]))
