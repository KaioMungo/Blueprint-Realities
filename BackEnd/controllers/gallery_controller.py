from flask import Blueprint, jsonify, request
from errors import EmptyStringError
from models.gallery_model import saveImage, getImages

gallery_blueprint = Blueprint('gallery', __name__)

@gallery_blueprint.route('/gallery', methods=['POST'])
def save_image():
    data = request.json
    try:
        saveImage(data)
        return jsonify({'status': 'Success'}), 201
    except EmptyStringError as e:
        return jsonify({'error': str(e)}), 400
    except KeyError:
        return jsonify({'error': 'Você não passou alguma chave.'}), 400
    
@gallery_blueprint.route('/gallery', methods=['GET'])
def get_images():
    return jsonify(getImages())