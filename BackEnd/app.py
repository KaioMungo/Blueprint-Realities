from config.database import app, db
from controllers.user_controller import user_blueprint

app.register_blueprint(user_blueprint)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )