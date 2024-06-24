# import the needed libraries
import json
import os
from flask import Flask,request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from imageai.Classification import ImageClassification
import uuid


# build the flask server
app = Flask(__name__)
CORS(app)

# setting global variables and rules
UPLOAD_FOLDER = 'images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadImage', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400


    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        model = request.form.get('model')
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'],unique_filename)
        file.save(file_path)
        result = analyse_image(file_path,model)
        delete_image(file_path)
        return jsonify({"message": "File successfully uploaded", "data": result}), 200

    return jsonify({"error": "Invalid file type, allowed types: png, jpg, jpeg"}), 400


def analyse_image(path,model):
    result = {}
    model = model.strip()
    execution_path = os.getcwd()
    model_path="resnet50-19c8e357.pth"
    prediction = ImageClassification()
    if model == "ResNet50":
        prediction.setModelTypeAsResNet50()
        model_path = "resnet50-19c8e357.pth"
    if model == "MobileNetV2":
        prediction.setModelTypeAsMobileNetV2()
        model_path = "mobilenet_v2-b0353104.pth"
    if model == "InceptionV3":
        prediction.setModelTypeAsInceptionV3()
        model_path="inception_v3_google-1a9a5a14.pth"
    if model == "DenseNet121":
        prediction.setModelTypeAsDenseNet121()
        model_path="densenet121-a639ec97.pth"

    prediction.setModelPath(os.path.join(execution_path, model_path))
    prediction.loadModel()
    predictions, probabilities = prediction.classifyImage(path, result_count=5)
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        result[eachPrediction] = eachProbability
    return result

def delete_image(file_path):
    try:
        os.remove(file_path)
        return True
    except:
        print("something went wrong")
