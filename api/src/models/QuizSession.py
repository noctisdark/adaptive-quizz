import datetime
from base import app, db
#from sqlalchemy.orm import joinedload

from models.Quiz import Quiz

class QuizSession(db.Model):
  __tablename__ = "quiz_sessions"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
  grade = db.Column(db.Integer)
  start_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  answers = db.relationship('QuizSessionAnswer', backref='quiz_session', lazy=True, cascade="all, delete-orphan")

class QuizSessionAnswer(db.Model):
  __tablename__ = "quiz_session_answers"

  id = db.Column(db.Integer, primary_key=True)
  quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_sessions.id'), nullable=False)
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
  answer = db.Column(db.Integer, db.CheckConstraint('answer BETWEEN 1 AND 4'))

def quiz_session_answer_to_dict(quiz_session_answer):
  return {"answer": quiz_session_answer.answer}

def quiz_session_to_dict(quiz_session):
  duration = quiz_session.quiz.duration
  return {
    "id": quiz_session.id,
    "startTime": quiz_session.start_time,
    "endTime": quiz_session.start_time + datetime.timedelta(seconds=duration),
    "duration": duration,
    "grade": quiz_session.grade,
    "answers": [quiz_session_answer_to_dict(answer) for answer in quiz_session.answers]
  }

with app.app_context():
  QuizSession.__table__.create(db.engine, checkfirst=True)
  QuizSessionAnswer.__table__.create(db.engine, checkfirst=True)


def create(user, quiz_id):
  quiz = Quiz.query.get(quiz_id)
  if not quiz: return {"error": "no such quiz."}
  quiz_session = QuizSession(user=user, quiz=quiz, grade=0, answers=[])
  db.session.add(quiz_session)
  db.session.commit()
  return {"error": None, "quiz_session": quiz_session_to_dict(quiz_session)}

def add_answer(user, quiz_session_id, data):
  quiz_session = QuizSession.query_with_quiz()