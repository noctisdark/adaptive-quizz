from base import app, db
import random

# from sqlalchemy.ext.hybrid import hybrid_property

class Quizz(db.Model):
  __tablename__ = "quizzes"

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(256))
  answer = db.Column(db.String(256))
  difficulty = db.Column(db.Integer)

# Create table if it doesn't exist
with app.app_context():
  Quizz.__table__.create(db.engine, checkfirst=True)

def quizz_to_dict(quizz):
  return {"id": quizz.id, 
           "question": quizz.question, 
           "answer": quizz.answer, 
           "difficulty": quizz.difficulty}

def quizzes_to_dicts(quizzes):
  return [quizz_to_dict(quizz) for quizz in quizzes]


def all():
  quizzes = Quizz.query.all()
  return {"error": None, "quizzes": quizzes_to_dicts(quizzes)}

def harder_than(difficulty):
  quizzes = Quizz.query.filter(Quizz.difficulty >= difficulty)
  return {"error": None, "quizz": quizz_to_dict(random.choice(quizzes))}

def easier_than(difficulty):
  quizzes = Quizz.query.filter(Quizz.difficulty <= difficulty)
  return {"error": None, "quizz": quizz_to_dict(random.choice(quizzes))}

def transition(quizz, answer):
  iscorrect = quizz.answer == answer
  if iscorrect:
    return harder_than(quizz.difficulty)
  else:
    return easier_than(quizz.difficulty)
