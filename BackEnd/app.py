<<<<<<< HEAD
<<<<<<< HEAD
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
=======
from config.database import app, db
from controllers.user_controller import user_blueprint
from controllers.prompt_controller import prompt_blueprint


app.register_blueprint(user_blueprint)
app.register_blueprint(prompt_blueprint)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
>>>>>>> 5d04b3d (feat: addition new functionality prompt)
=======
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
>>>>>>> bcadf1ff3db2cf303eb4aeb051c23bd755ffb305
    )