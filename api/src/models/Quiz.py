from base import app, db
from sqlalchemy.orm import joinedload
import random

# from sqlalchemy.ext.hybrid import hybrid_property

# Create table user first
import models.User

class Quiz(db.Model):
  __tablename__ = "quizzes"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(64))
  description = db.Column(db.String(256))
  background_url = db.Column(db.String(256))
  author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  public = db.Column(db.Boolean, default=False)
  questions = db.relationship('Question', backref='quiz', lazy=True)

class Question(db.Model):
  __tablename__ = "questions"

  id = db.Column(db.Integer, primary_key=True)
  statement = db.Column(db.String(256))
  answer = db.Column(db.Integer, db.CheckConstraint('answer BETWEEN 1 AND 4'))
  difficulty = db.Column(db.Integer, db.CheckConstraint('difficulty > 0'))
  option_1 = db.Column(db.String(64))
  option_2 = db.Column(db.String(64))
  option_3 = db.Column(db.String(64))
  option_4 = db.Column(db.String(64))
  quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'))


# Create table if it doesn't exist
with app.app_context():
  Quiz.__table__.create(db.engine, checkfirst=True)
  Question.__table__.create(db.engine, checkfirst=True)

def question_to_dict(question):
  return {
    "id": question.id,
    "statement": question.statement,
    "answer": question.answer,
    "option_1": question.option_1,
    "option_2": question.option_2,
    "option_3": question.option_3,
    "option_4": question.option_4,
  }

def quiz_to_dict(quiz):
  return {
    "id": quiz.id,
    "title": quiz.title,
    "description": quiz.description,
    "author": quiz.author.username,
    "questions": [question_to_dict(question) for question in quiz.questions]
  }


def all():
  # Eager load to avoid N+1 queries
  public_quizzes = db.session.query(Quiz).options(
    joinedload(Quiz.author),
    joinedload(Quiz.questions)
  ).filter_by(public=True).all()
  return {"error": None, "quizzes": [quiz_to_dict(quiz) for quiz in public_quizzes]}

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

