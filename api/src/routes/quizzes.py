from base import app
from flask import jsonify
from models import Quizz

# Define needed routes for user
@app.route('/quizzes')
def get_quizzes():
  result = Quizz.all()
  if not result["error"]:
    quizzes = result["quizzes"]
    return jsonify(quizzes), 200
  else:
    return jsonify(result["error"]), 400
