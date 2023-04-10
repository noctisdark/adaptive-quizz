from base import app
from flask import jsonify, request
from models import Quizz


@app.route('/quizzes')
def get_quizzes():
  result = Quizz.all()
  if not result["error"]:
    quizzes = result["quizzes"]
    return jsonify(quizzes), 200
  else:
    return jsonify(result["error"]), 400


@app.route("/quizz/add", methods=["POST"])
def add_quizz():
  question = request.form["question"]
  answer = request.form["answer"]
  difficulty = request.form["difficulty"]
  quizz = Quizz.Quizz(question, answer, difficulty)
  return jsonify(Quizz.db_add_quizz(quizz)), 200


@app.route("/quizz/del", methods=["POST"])
def del_quizz():
  id = request.form["id"]
  quizz = Quizz.Quizz.query.get(id)
  return jsonify(Quizz.db_del_quizz(quizz)), 200



