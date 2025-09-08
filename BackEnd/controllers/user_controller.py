from flask import Blueprint, jsonify, request
from errors import EmptyStringError, ErrorPassword, AuthError
from models.user_model import register, login

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/register', methods=['POST'])
def create_register():
    data = request.json
    try:
        register(data)
        return jsonify({'status': 'Success'}), 201
    except EmptyStringError as e:
        return jsonify({'error': str(e)}), 400
    except ErrorPassword as e:
        return jsonify({'error': str(e)}), 400
    except KeyError:
        return jsonify({'error': 'Você não passou alguma chave.'}), 400
    except AuthError as e:
        return jsonify({'error': str(e)}), 401
    
@user_blueprint.route('/login', methods=['POST'])
def do_login():
    data = request.json
    try:
        message = login(data)
        return jsonify({'status': message}), 201
    except EmptyStringError as e:
        return jsonify({'error': str(e)}), 400
    except ErrorPassword as e:
        return jsonify({'error': str(e)}), 400
    except KeyError:
        return jsonify({'error': 'Você não passou alguma chave.'}), 400
    except AuthError as e:
        return jsonify({'error': str(e)}), 401