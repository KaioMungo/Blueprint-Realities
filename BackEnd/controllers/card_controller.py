from flask import Blueprint, jsonify, request
from errors import EmptyStringError, IdNotExist
from models.card_model import createCard, getCards, deleteCard

card_blueprint = Blueprint('card', __name__)

@card_blueprint.route('/cards', methods=['POST'])
def create_card():
    data = request.json
    try:
        createCard(data)
        return jsonify({'status': 'Success'}), 201
    except EmptyStringError as e:
        return jsonify({'error': str(e)}), 400
    except KeyError:
        return jsonify({'error': 'Você não passou alguma chave.'}), 400
    
@card_blueprint.route('/cards', methods=['GET'])
def get_cards():
    return jsonify(getCards())

@card_blueprint.route("/cards/<int:id>", methods=['DELETE'])
def delete_card(id):
    try:
        deleteCard(id)
        return jsonify({'Success': True})
    except IdNotExist as e:
        return jsonify({'Error': str(e)}), 404