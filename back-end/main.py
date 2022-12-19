from flask import Flask, request, render_template, send_from_directory, jsonify
import time
import json
import math
import os

app = Flask(__name__, template_folder='templates')

@app.route("/test_api")
def test_api():
    return {
        'id': '0xff',
        'status': 'success'
    }

@app.route('/')
def index():
    return render_template('mainpage.html')

def main():
    # For heroku, remove this line. We'll use gunicorn to run the app
    app.run() # app.run(debug=True) 

@app.route("/manifest.json")
def manifest():
    return send_from_directory('./frontend/build', 'manifest.json')

@app.route("/favicon.ico")
def favicon():
    return send_from_directory('./frontend/build', 'favicon.ico')

if __name__=='__main__':
    main()