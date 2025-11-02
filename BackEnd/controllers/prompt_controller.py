from flask import Blueprint, jsonify, request, send_file
from errors import EmptyStringError
from models.prompt_model import Prompt
import os  

prompt_blueprint = Blueprint('prompt', __name__)

@prompt_blueprint.route('/gerar-imagem', methods=['POST'])
def gerar_imagem():
    data = request.form  
    image_file = request.files.get('img') #Upload de imagem
    
    try:
        if not image_file:
            return jsonify({'error': 'Image is necessary'}), 400
        
        prompt = Prompt(
            metragem=data.get('metragem'),
            orcamento=data.get('orcamento'),
            paleta_cores=data.get('paleta_cores'),
            estilo=data.get('estilo'),
            img=image_file
        )
        
        prompt_data = prompt.gerar_prompt()
        print(f'Prompt gerado: \n\n{prompt_data}')
        
        return jsonify({'imageURL': 'https://i.imgur.com/iDYOFSH.png'})
        
    except EmptyStringError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
