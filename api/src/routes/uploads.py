import os
from base import app, db
from base.jwt import token_required
from flask import send_from_directory, request
from werkzeug.utils import secure_filename
from uuid import uuid4


@app.route('/upload', methods=['POST'])
@token_required
def upload_image(current_user):
  if "image" in request.files:
    file = request.files["image"]
    filename = str(uuid4()) + '_' + secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    access_path = '/uploads/' + filename
    file.save(save_path)
    if request.form.get("set_profile"):
      current_user.image_url = access_path
      db.session.add(current_user)
      db.session.commit()
    return access_path
  return "No image supplied", 400
# Keep it simple for now

@app.route('/uploads/<path:filename>', methods=['GET'])
def get_image(filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)