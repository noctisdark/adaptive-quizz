from base import app, db
from sqlalchemy import or_
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
  questions = db.relationship('Question', backref='quiz', lazy=True, cascade='all, delete-orphan', order_by='Question.id')

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
    "difficulty": question.difficulty,
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
    "backgroundURL": quiz.background_url,
    "authorId": quiz.author.id,
    "public": quiz.public,
    "author": quiz.author.username,
    "questions": [question_to_dict(question) for question in quiz.questions]
  }


def all(user):
  # Eager load to avoid N+1 queries
  public_quizzes = db.session.query(Quiz).options(
    joinedload(Quiz.author),
    joinedload(Quiz.questions)
  ).filter(or_(Quiz.public==True, Quiz.author_id == user.id)).all()
  return {"error": None, "quizzes": [quiz_to_dict(quiz) for quiz in public_quizzes]}

def create(user, data):
  new_quiz = Quiz(title=data["title"], description=data["description"], author_id=user.id, background_url=data["backgroundURL"], public=True, questions=[])
  db.session.add(new_quiz)
  db.session.commit()
  return {"error": None, "quiz": quiz_to_dict(new_quiz)}

def update(user, data):
  quiz = Quiz.query.get(data["id"])
  if not quiz: return {"error": "No such quiz."}
  quiz.title = data["title"]
  quiz.description = data["description"]
  quiz.background_url = data["backgroundURL"]
  quiz.public = data.get("public", True)
  db.session.commit()
  return {"error": None, "quiz": quiz_to_dict(quiz)}


def delete(user, id):
  quiz = Quiz.query.get(id)
  if not quiz: return {"error": "No such quiz."}
  db.session.delete(quiz) #SQLAlchemy should handle the rest
  db.session.commit()
  return {"error": None}

def create_question(user, quiz_id, data):
  new_question = Question(
    statement=data["statement"],
    option_1=data["option_1"],
    option_2=data["option_2"],
    option_3=data["option_3"],
    option_4=data["option_4"],
    answer=data["answer"],
    difficulty=data["difficulty"],
    quiz_id=quiz_id
  )
  db.session.add(new_question)
  db.session.commit()
  return {"error": None, "question": question_to_dict(new_question)}

def update_question(user, data):
  question = Question.query.get(data["id"])
  if not question: return {"error": "No such question."}
  question.statement = data["statement"]
  question.option_1 = data["option_1"]
  question.option_2 = data["option_2"]
  question.option_3 = data["option_3"]
  question.option_4 = data["option_4"]
  question.answer = data["answer"]
  question.difficulty = data["difficulty"]  
  db.session.commit()
  return {"error": None, "question": question_to_dict(question)}

def delete_question(user, question_id):
  question = Question.query.get(question_id)
  if not question: return {"error": "No such question."}
  db.session.delete(question)
  db.session.commit()
  return {"error": None, "question": question_to_dict(question)}

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

