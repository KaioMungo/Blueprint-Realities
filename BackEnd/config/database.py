<<<<<<< HEAD
<<<<<<< HEAD
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 5000
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

=======
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 5000
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

>>>>>>> 5d04b3d (feat: addition new functionality prompt)
=======
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 5000
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

>>>>>>> bcadf1ff3db2cf303eb4aeb051c23bd755ffb305
db = SQLAlchemy(app)