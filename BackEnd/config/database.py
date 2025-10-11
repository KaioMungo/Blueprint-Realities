from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 5000
app.config['DEBUG'] = True

username = 'root'
password = 'Dg$8rT!2mQ#5xL9w'
hostname = 'localhost'
database = 'blueprint'


app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{username}:{password}@{hostname}/{database}"
)
db = SQLAlchemy(app)