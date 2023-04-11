from base import app, db
import random


class Quizz(db.Model):
  __tablename__ = "quizzes"

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(256))
  answer = db.Column(db.Integer)
  option1 = db.Column(db.String(256))
  option2 = db.Column(db.String(256))
  option3 = db.Column(db.String(256))
  difficulty = db.Column(db.Integer)
  #users = db.relationship("User", secondary=user_quizz, backref="quizzes")

  def __init__(self, question, answer, option1, option2, option3=None, difficulty=50):
    self.question = question
    self.answer = answer 
    self.option1 = option1 
    self.option2 = option2
    self.option3 = option3
    self.difficulty = difficulty

# Create table if it doesn't exist
with app.app_context():
  Quizz.__table__.create(db.engine, checkfirst=True)


def quizz_to_dict(quizz):
  return {"id": quizz.id, 
           "question": quizz.question, 
           "answer": quizz.answer, 
           "option1": quizz.option1,
           "option2": quizz.option2,
           "option3": quizz.option3,
           "difficulty": quizz.difficulty}

def quizzes_to_dicts(quizzes):
  return [quizz_to_dict(quizz) for quizz in quizzes]


def all():
  quizzes = Quizz.query.all()
  return {"error": None, "quizzes": quizzes_to_dicts(quizzes)}

def harder_than(difficulty):
  quizzes = Quizz.query.filter(Quizz.difficulty >= difficulty)
  quizz = random.choice(list(quizzes))
  if not quizz:
    return {"error": "Quizz Not Found"}
  return {"error": None, "quizz": quizz_to_dict(quizz)}

def easier_than(difficulty):
  quizzes = Quizz.query.filter(Quizz.difficulty <= difficulty)
  quizz = random.choice(list(quizzes))
  if not quizz:
    return {"error": "Quizz Not Found"}
  return {"error": None, "quizz": quizz_to_dict(quizz)}

def transition(quizz, answer):
  iscorrect = quizz.answer == answer
  if iscorrect:
    return harder_than(quizz.difficulty)
  else:
    return easier_than(quizz.difficulty)


def db_add_quizz(quizz):
  db.session.add(quizz)
  db.session.commit()
  return {"error": None}


def db_del_quizz(quizz):
  db.session.delete(quizz) 
  db.session.commit()
  return {"error": None}

