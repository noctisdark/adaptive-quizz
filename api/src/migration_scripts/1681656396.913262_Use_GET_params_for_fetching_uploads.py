name = "Use GET params for fetching uploads"

from base import app, db
from models.User import User
from models.Quiz import Quiz

def run():
  with app.app_context():
    print("Using new URL for user images")
    for user in User.query.all():
      image_url = user.image_url
      if not image_url: continue
      uploads_index = image_url.find('/uploads/')
      if uploads_index < 0: continue
      print(image_url)
      filename = image_url[uploads_index+9:] 
      user.image_url = image_url[:uploads_index] + '/uploads?filename=' + filename
    print("Done !")
    print("Using new URL for quiz images")
    for quiz in Quiz.query.all():
      image_url = quiz.background_url
      if not image_url: continue
      uploads_index = image_url.find('/uploads/')
      if uploads_index < 0: continue
      print(image_url)
      filename = image_url[uploads_index+9:] 
      quiz.background_url = image_url[:uploads_index] + '/uploads?filename=' + filename
    print("Done. Saving...")
    db.session.commit()
    print("All good !")