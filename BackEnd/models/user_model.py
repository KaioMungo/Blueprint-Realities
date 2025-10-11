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
    required_fields = ['full_name', 'email', 'password', 'confirm_password']

    if not all(field in data for field in required_fields):
        raise KeyError("Missing required registration fields.")
    

    if any(data[field].strip() == "" for field in required_fields):
        raise EmptyStringError('All fields must be filled out.')
    
    existing_user = User.query.filter_by(email=data['email']).first()

    if existing_user:
        raise AuthError('Email already registered.')
    
    if data['confirm_password'] != data['password']:
        raise ErrorPassword('Please make sure both password fields match.')
    
    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(new_user)
    db.session.commit()
    
def login(data):
    required_fields = ['email', 'password']
    if not all(field in data for field in required_fields):
        raise KeyError("Missing login fields.")
    
    if any(data[field].strip() == "" for field in required_fields):
        raise EmptyStringError('All fields must be filled out.')
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or user.password != data['password']:
        raise AuthError('Email or password are incorrect.')

    return 'Authentication Success'