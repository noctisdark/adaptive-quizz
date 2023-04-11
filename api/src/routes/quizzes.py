from base import app
from flask import jsonify, request, redirect, url_for
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
  option1 = request.form["option1"]
  option2 = request.form["option2"]
  option3 = request.form["option3"]
  difficulty = request.form["difficulty"]
  quizz = Quizz.Quizz(question, answer, option1, option2, option3, difficulty)
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
