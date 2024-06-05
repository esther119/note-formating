## Create Group Routes in Python

### What is Blueprint?

* A blueprint object named `routes`. This object is used to organize a group of related routes and other view functions into a modular structure that can be registered in a Flask application.

### Creating Subroutes

* `@routes.route("/get_cards_for_deck/", methods=["POST"])`
	+ `def get_cards_for_deck(deck_id): ...`

### Register Blueprint

* `app.register_blueprint(study_group_routes.routes, url_prefix="/groups")`