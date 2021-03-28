import os
import urllib.request
import base64
import coinflip
from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from werkzeug.utils import secure_filename
from PIL import Image, ImageFilter

UPLOAD_FOLDER = 'static/uploads/'

# initialize instance of WSGI application
# act as a central registry for the view functions, URL rules, template configs
app = Flask(__name__, instance_relative_config=True)
CORS(app)

# instantiate Bootstrap
Bootstrap(app)

app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg', 'gif'}

def allowed_file(filename):
   return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# initalize app with database

@app.route("/")
def index():
    return "Hello World"

@app.route("/function", methods=['POST', 'GET', 'OPTIONS'])
def classify():
   #We have parameters
   if request.method == 'POST':
      #Passed as a json, so we can access like this
      #this is an easy example, but should be applicable for other params
      #provided that we pass them in as a json through the button
      img_path = request.get_json()['image']
      im = Image.open(img_path)
      result = coinflip.flip(request.get_json()['input'])
      #instead of encoding/decoding, just save it in 'results' folder
      #and can access from canvas that way
      flipped_img = coinflip.flipImg(im)
      new_path = 'static/results/' + img_path[15:]
      flipped_img.save(new_path)
      response = jsonify({'value': result,
         'image': new_path
         })
      response.headers.add('Access-Control-Allow-Origin', '*')
      response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
      response.headers.add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      return response
   return "Hello world"

@app.route("/img-upload", methods=['POST', 'GET', 'OPTIONS'])
def upload():
   if request.method == "POST":
      if 'background' not in request.files:
         flash('No file part')
         return redirect(request.url)
      background = request.files['background']
      print(background)
      if background and allowed_file(background.filename):
         filename = secure_filename(background.filename)
         background.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
         response = jsonify({'filename': filename})
         response.headers.add('Access-Control-Allow-Origin', '*')
         response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
         response.headers.add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
         return response
   return "Hello world"