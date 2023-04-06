from flask import Flask, request, render_template, send_from_directory, jsonify
from pymongo import MongoClient, database
from dotenv import load_dotenv
from PIL import Image
import base64

import time
import json
import math
import torch
import os

from siamese_model import SiameseConvNet, distance_metric
from preprocessing import convert_to_image_tensor, invert_image
from signature_search import init, get_index

app = Flask(__name__, template_folder='templates')
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024
mongodb = None

def load_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('CONNECTION_STRING')
    print(CONNECTION_STRING)
    client = MongoClient(CONNECTION_STRING)
    global mongodb
    mongodb = client['mta_signature']
#.................................................................................
def insert_into_users(item):
    db_filter = {}
    n_users = mongodb['users'].count_documents(db_filter)
    item['_id'] = n_users + 1
    mongodb['users'].insert_one(item) 
#.................................................................................
def insert_into_signatures(item):
    db_filter = {}
    n_signatures = mongodb['signatures'].count_documents(db_filter)
    item['_id'] = n_signatures + 1
    mongodb['signatures'].insert_one(item)
#.................................................................................
def load_model():
    device = torch.device('cpu')
    model = SiameseConvNet()
    model.load_state_dict(torch.load('siamese-mtasig-rms2-28.3.pt', map_location=device))
    model.eval()
    return model
#.................................................................................
@app.route('/get-signature-list/<string:id>', methods=['GET'])
def get_sig_list(id):
    try:
        print(type(id))
        print(id)
        db_filter = {"userId": int(id)}
        signatures = mongodb['signatures'].find(db_filter)
        json_res = []
        for s in signatures:
            json_res.append(s)
        print(json_res)
        return jsonify({"status": 200, 'message': "success", 'data': json_res})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})
#.................................................................................
@app.route('/get-user-list', methods=['GET'])
def get_user_list():
    try:
        db_filter = {}
        users = mongodb['users'].find(db_filter)
        json_res = []
        for u in users:
            json_res.append(u)
        print(json_res)
        return jsonify({"status": 200, 'message': "success", 'data': json_res})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})
#.................................................................................
def get_user(id):
    try:
        db_filter = {'_id': id}
        user = mongodb['users'].find_one(db_filter)
        return jsonify({"status": 200, 'message': "success", 'data': user})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})
#.................................................................................
@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        print(data)
        insert_into_users(data)
        return jsonify({"status": 200, 'message': "success"})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})
#.................................................................................
@app.route('/upload-sig-image/<string:id>', methods=['POST'])
def upload_sig_image(id):
    try:
        # data = request.get_json() ??????
        # print(request.is_json)
        data = json.loads(request.data)
        print(data)
        insert_into_signatures(data)
        return jsonify({"status": 200, 'message': "success"})
    except Exception as e:
        print(e)
        return jsonify({'status': 400,'message': str(e)})
#.................................................................................
@app.route('/user/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def act_user(id):
    if request.method == 'DELETE':
        try:
            mongodb['users'].delete_many({'_id': int(id)})
            print('Delete successful #' + id)
            return jsonify({"status": 200, 'message': 'Data id: ' + id + ' is deleted!'})
        except Exception as e:
            print(e)
            return jsonify({'status': 400,'message': str(e)})
#.................................................................................
@app.route("/test-api")
def test_api():
    model = load_model()
    return {
        'id': 'siamese_model',
        'status': 'success',
        'eval': str(model.eval()),
    }
#.................................................................................
@app.route('/')
def index():
    return render_template('mainpage.html')
#.................................................................................
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

        return jsonify({"status": 200, "threshold": 0.0433, "distance": round(dist, 6)})
    except Exception as e:
        print(e)
        return jsonify({'status': 400, 'message': str(e)})
#.................................................................................
@app.route('/identification', methods=['POST'])
def identification():
    try:
        model = load_model()
        
        inputImage = Image.open(request.files['uploadedImage'])
        inputImage_tensor = convert_to_image_tensor(invert_image(inputImage)).view(1, 1, 220, 155)
        f_A = model.forward_once(inputImage_tensor)

        index = get_index(f_A.tolist())

        # print(f_A)
        print(index)
        
        return (get_user(index))

        # return jsonify({"status": 200, "threshold": 0.0433, "distance": round(dist, 6)})
    except Exception as e:
        print(e)
        return jsonify({'status': 400, 'message': str(e)})
#.................................................................................
def main():
    # For heroku, remove this line. We'll use gunicorn to run the app
    load_database()
    app.run() # app.run(debug=True) 
    
if __name__=='__main__':
    init()
    main()