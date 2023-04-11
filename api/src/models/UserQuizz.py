from base import app, db


user_quizz = db.Table(
    "user_quizz",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("quizz_id", db.Integer, db.ForeignKey("quizzes.id"), primary_key=True)
)

