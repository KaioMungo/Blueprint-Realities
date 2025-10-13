from config.database import db
from errors import EmptyStringError, IdNotExist

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    budget = db.Column(db.Integer, nullable=False)
    color_palette = db.Column(db.String(50), nullable=False)
    footage = db.Column(db.Integer, nullable = False)
    style = db.Column(db.String(50), nullable = False)

    def __init__(self, budget, color_palette, footage, style):
        self.budget = budget
        self.color_palette = color_palette
        self.footage = footage
        self.style = style

    def to_dict(self):
        return {
            "id": self.id,
            "budget": self.budget,
            "color_palette": self.color_palette,
            "footage": self.footage,
            "style": self.style
        }

def createCard(data):
    required_keys = ['budget', 'color_palette', 'footage', 'style']
    if not all(key in data for key in required_keys):
        raise KeyError
    
    if data['budget'] == "" or data['color_palette'] == "" or data['footage'] == "" or data['style'] == "":
        raise EmptyStringError('All fields must be filled out')
    
    card = Card(
        budget=data['budget'],
        color_palette=data['color_palette'],
        footage=data['footage'],
        style=data['style']
    )

    db.session.add(card)
    db.session.commit()

def getCards():
    cards = Card.query.all()
    return [card.to_dict() for card in cards]

def deleteCard(id):
    card = Card.query.get(id)

    if not card:
        raise IdNotExist("O card que você quer deletar não foi encontrado.")
    
    db.session.delete(card)
    db.session.commit()