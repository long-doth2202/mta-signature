from flask import Flask, request, render_template, send_from_directory, jsonify
import time
import json
import math
import torch
import os

from siamese_model import SiameseConvNet, distance_metric
from preprocessing import convert_to_image_tensor, invert_image

app = Flask(__name__, template_folder='templates')

@app.route("/test_api")
def test_api():
    model = SiameseConvNet()

    return {
        'id': 'siamese_model',
        'status': 'success',
        'eval': str(model.eval()),
    }

@app.route('/')
def index():
    return render_template('mainpage.html')

@app.route('/verify', method=['POST'])
def verify():
    pass

def main():
    # For heroku, remove this line. We'll use gunicorn to run the app
    app.run() # app.run(debug=True) 

if __name__=='__main__':
    main()