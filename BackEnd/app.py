from config.database import app, db
from controllers.user_controller import user_blueprint
from controllers.prompt_controller import prompt_blueprint
from controllers.card_controller import card_blueprint
from controllers.gallery_controller import gallery_blueprint


app.register_blueprint(user_blueprint)
app.register_blueprint(prompt_blueprint)
app.register_blueprint(card_blueprint)
app.register_blueprint(gallery_blueprint)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )