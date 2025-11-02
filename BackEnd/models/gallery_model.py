from config.database import db
from errors import EmptyStringError

class Gallery(db.Model):
    __tablename__ = "gallery"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image = db.Column(db.String(255), nullable=False)
    style = db.Column(db.String(50), nullable=False)

    def __init__(self, image, style):
        self.image = image
        self.style = style

    def to_dict(self):
        return {
            "id": self.id,
            "image": self.image,
            "style": self.style
        }

def saveImage(data):
    required_keys = ['image', 'style']
    if not all(key in data for key in required_keys):
        raise KeyError
    
    if data['image'] == "" or data['style'] == "":
        raise EmptyStringError('All fields must be filled out')
    
    image = Gallery(
        image=data['image'],
        style=data['style']
    )

    db.session.add(image)
    db.session.commit()

def getImages():
    images = Gallery.query.all()
    return [image.to_dict() for image in images]