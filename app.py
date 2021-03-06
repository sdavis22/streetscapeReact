import os
import urllib.request
import coinflip
from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from flask_bootstrap import Bootstrap
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads/'

# initialize instance of WSGI application
# act as a central registry for the view functions, URL rules, template configs
app = Flask(__name__, instance_relative_config=True)

# instantiate Bootstrap
Bootstrap(app)

app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['pdf', 'doc', 'docx', 'pages'])

def allowed_file(filename):
   return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# initalize app with database

@app.route("/")
def index():
    return "Hello World"

@app.route("/function", methods=['POST', 'GET', 'OPTIONS'])
def classify():
   result = coinflip.flip()
   response = jsonify({'value': result})
   response.headers.add('Access-Control-Allow-Origin', '*')
   response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
   response.headers.add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
   return response
