from flask import Flask, request, render_template, send_from_directory, jsonify
from pymongo import MongoClient, database
from dotenv import load_dotenv
from PIL import Image
import time
import json
import math
import torch
import os

from siamese_model import SiameseConvNet, distance_metric
from preprocessing import convert_to_image_tensor, invert_image

app = Flask(__name__, template_folder='templates')
mongodb = None

def load_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('CONNECTION_STRING')
    print(CONNECTION_STRING)
    client = MongoClient(CONNECTION_STRING)
    global mongodb
    mongodb = client['mta_signature']

def insert_into_users(item):
    db_filter = {}
    n_users = mongodb['users'].count_documents(db_filter)
    item['_id'] = n_users + 1
    mongodb['users'].insert_one(item) # collection

def load_model():
    device = torch.device('cpu')
    model = SiameseConvNet()
    model.load_state_dict(torch.load('siamese2-cedar.pt', map_location=device))
    model.eval()
    return model

@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        insert_into_users(data)
        print(data)
        return jsonify({"status": 200, 'message': "success"})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})

@app.route("/test-api")
def test_api():
    model = load_model()
    return {
        'id': 'siamese_model',
        'status': 'success',
        'eval': str(model.eval()),
    }

@app.route('/')
def index():
    return render_template('mainpage.html')

@app.route('/verify', methods=['POST'])
def verify():
    try:
        model = load_model()
        
        inputImageL = Image.open(request.files['uploadedImageL'])
        inputImageR = Image.open(request.files['uploadedImageR'])
        
        inputImageL_tensor = convert_to_image_tensor(invert_image(inputImageL)).view(1, 1, 220, 155)
        inputImageR_tensor = convert_to_image_tensor(invert_image(inputImageR)).view(1, 1, 220, 155)

        f_A, f_X = model.forward(inputImageL_tensor, inputImageR_tensor)
        dist = float(distance_metric(f_A, f_X).detach().numpy())

        return jsonify({"status": 200, "threshold":0.049, "distance":round(dist, 6)})
    except Exception as e:
        print(e)
        return jsonify({'status': 400, 'message': str(e)})


def main():
    # For heroku, remove this line. We'll use gunicorn to run the app
    load_database()
    app.run() # app.run(debug=True) 
    
if __name__=='__main__':
    main()