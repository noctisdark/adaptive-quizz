import datetime
from sqlalchemy.orm import joinedload
from base import app, db
#from sqlalchemy.orm import joinedload

from models.Quiz import Quiz, question_to_dict

class QuizSession(db.Model):
  __tablename__ = "quiz_sessions"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
  score = db.Column(db.Integer, default=0)
  start_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  completed = db.Column(db.Boolean, default=False)
  last_question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=True, default=None)
  answers = db.relationship('QuizSessionAnswer', backref='quiz_session', lazy=True, cascade="all, delete-orphan")

class QuizSessionAnswer(db.Model):
  __tablename__ = "quiz_session_answers"

  id = db.Column(db.Integer, primary_key=True)
  quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_sessions.id'), nullable=False)
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
  question = db.relationship('Question', lazy=True)
  answer = db.Column(db.Integer, db.CheckConstraint('answer BETWEEN 1 AND 4'))

def quiz_session_answer_to_dict(user, quiz_session_answer):
  data = {"question_id": quiz_session_answer.question_id, "answer": quiz_session_answer.answer}
  return data

def quiz_session_to_dict(user, quiz_session):
  duration = quiz_session.quiz.duration
  return {
    "id": quiz_session.id,
    "startTime": datetime.datetime.timestamp(quiz_session.start_time),
    "endTime": datetime.datetime.timestamp(quiz_session.start_time + datetime.timedelta(seconds=duration)),
    "duration": duration,
    "score": quiz_session.score,
    "complete": quiz_session.completed,
    "answers": [quiz_session_answer_to_dict(user, answer) for answer in quiz_session.answers]
  }

with app.app_context():
  QuizSession.__table__.create(db.engine, checkfirst=True)
  QuizSessionAnswer.__table__.create(db.engine, checkfirst=True)


def create(user, quiz_id):
  quiz = Quiz.query.get(quiz_id)
  if not quiz: return {"error": "no such quiz."}
  quiz_session = QuizSession(user=user, quiz=quiz, answers=[])
  db.session.add(quiz_session)
  db.session.commit()
  return {"error": None, "quiz_session": quiz_session_to_dict(user, quiz_session)}

def conclude(quiz_session):
  if quiz_session.completed: return
  score = 0
  for answer in quiz_session.answers:
    # answer.question should be in the identity map
    if answer.answer == answer.question.answer:
      score += answer.question.difficulty
  
  quiz_session.score = score
  quiz_session.completed = True
  quiz_session.last_question_id = None
  db.session.commit()


def complete(user, quiz_session_id):
  quiz_session = QuizSession.query.options(
    joinedload(QuizSession.answers),
    joinedload(QuizSession.quiz).joinedload(Quiz.questions)
  ).get(quiz_session_id)

  if not user.can_edit_quiz_session(quiz_session):
    return {"error": "Cannot end others' quiz session."}
  
  conclude(quiz_session)
  return {"error": None, "quiz_session": quiz_session_to_dict(user, quiz_session)}

def next_question(user, quiz_session_id, quiz_session = None):
  quiz_session = quiz_session or QuizSession.query.options(
    joinedload(QuizSession.answers),
    joinedload(QuizSession.quiz).joinedload(Quiz.questions)
  ).get(quiz_session_id)
  
  if not quiz_session: return {"error": "No such quiz session."}
  if not user.can_edit_quiz_session(quiz_session): {"error": "You cannot interfere others' quiz sessions."}
  if quiz_session.completed: return {"error": None, "quiz_session": quiz_session_to_dict(user, quiz_session)}

  answered_questions_ids = set([answer.question_id for answer in quiz_session.answers])
  next_question = None
  for question in quiz_session.quiz.questions:
    if not question.id in answered_questions_ids:
      next_question = question
      break 

  if not next_question:
    conclude(quiz_session)
    return {"error": None, "quiz_session": quiz_session_to_dict(user, quiz_session)}
  else:
    quiz_session.last_question_id = next_question.id
    db.session.commit()
    return {"error": None, "next_question": question_to_dict(user, next_question)}

def answer_question(user, quiz_session_id, answer):
  quiz_session = QuizSession.query.options(
    joinedload(QuizSession.answers),
    joinedload(QuizSession.quiz).joinedload(Quiz.questions)
  ).get(quiz_session_id)

  if not quiz_session: return {"error": "No such quiz session."}
  if quiz_session.completed: return {"error": "Quiz session ended."}
  if not user.can_edit_quiz_session(quiz_session): {"error": "You cannot answer on others' quiz sessions."}

  quiz_session_answer = QuizSessionAnswer(quiz_session_id=quiz_session_id, question_id=quiz_session.last_question_id, answer=answer)
  db.session.add(quiz_session_answer)
  db.session.commit()
  return next_question(user, quiz_session_id, quiz_session)