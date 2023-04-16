import os
from base import app, db
from base.jwt import token_required
from flask import request, send_file
from werkzeug.utils import secure_filename
from uuid import uuid4


@app.route('/upload', methods=['POST'])
@token_required
def upload_image(current_user):
  if "image" in request.files:
    file = request.files["image"]
    filename = str(uuid4()) + '_' + secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    access_path = '/uploads?filename=' + filename
    file.save(save_path)
    if request.form.get("set_profile"):
      current_user.image_url = request.host_url + access_path
      db.session.add(current_user)
      db.session.commit()
    return request.host_url + access_path
  return "No image supplied", 400
# Keep it simple for now

@app.route('/uploads', methods=['GET'])
def get_image():
  filename = request.args.get('filename')
  if not filename:
    return "No filename supplied", 400
  if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
    return "File not found", 404
  return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), as_attachment=True)