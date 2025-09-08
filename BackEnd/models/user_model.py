from config.database import db
from errors import ErrorPassword, EmptyStringError, AuthError

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable = False)

    def __init__(self, full_name, email, password):
        self.full_name = full_name
        self.email = email
        self.password = password

def register(data):
    if 'full_name' and 'email' and 'password' and 'confirm_password' not in data:
        raise KeyError
    
    if data['full_name'] == "" or data['email'] == "" or data['password'] == "" or data['confirm_password'] == "":
        raise EmptyStringError('All fields must be filled out')
    
    user = User.query.filter_by(email=data['email']).first()

    if user:
        raise AuthError('Email already registered.')
    
    if data['confirm_password'] != data['password']:
        raise ErrorPassword('Please make sure both password fields match.')
    
    user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(user)
    db.session.commit()
    
def login(data):
    if 'email' and 'password' not in data:
        raise KeyError
    
    if data['email'] == "" or data['password'] == "":
        raise EmptyStringError('All fields must be filled out')
    
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        raise AuthError('Email or password are incorrect')
    
    if user.password != data['password']:
        raise AuthError('Email or password are incorrect')
    
    return 'Authentication Success'