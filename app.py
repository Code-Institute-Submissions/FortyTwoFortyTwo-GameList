import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session,
    url_for, abort)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def home():
    # Open home page with games and categories database
    games = mongo.db.games.find()
    categories = mongo.db.categories.find()
    return render_template("index.html", games=games, categories=categories)


@app.route("/new")
def new():
    # Open page for creating new game
    categories = mongo.db.categories.find()
    return render_template("new.html", categories=categories)


@app.route("/info/<id>")
def info(id):
    # Check if id entered is valid, display 404 error page if not valid
    if not ObjectId.is_valid(id):
        abort(404)

    # Find game by id entered, display 404 error page if could not find one
    game = mongo.db.games.find_one_or_404({"_id": ObjectId(id)})
    categories = mongo.db.categories.find()

    # Display info page
    return render_template("info.html", game=game, categories=categories)


@app.route("/game_insert", methods=['POST'])
def game_insert():
    # If category entered is not blank, convert to ObjectId
    category = request.form['category']
    if (category != ""):
        category = ObjectId(category)

    # Create object of datas to send to database
    game_data = {
        "title": request.form['title'],
        "cost": request.form['cost'],
        "rating": request.form['rating'],
        "category": category,
        "desp": request.form['desp']
    }

    # Insert to database
    x = mongo.db.games.insert_one(game_data)

    # Return id of newly inserted data
    return str(x.inserted_id)


@app.route("/game_update", methods=['POST'])
def game_update():
    # Check if id entered is valid,
    # display 400 error page if not valid
    if not ObjectId.is_valid(request.form['id']):
        abort(400)

    # Find id in table to see if there is one,
    # display 400 error page if not found
    id = ObjectId(request.form['id'])
    if not bool(mongo.db.games.find_one({"_id": id})):
        abort(400)

    # If category entered is not blank, convert to ObjectId
    category = request.form['category']
    if (category != ""):
        category = ObjectId(category)

    # Create object of datas to update to database
    game_data = {
        "title": request.form['title'],
        "cost": request.form['cost'],
        "rating": request.form['rating'],
        "category": category,
        "desp": request.form['desp']
    }

    # Update to database by id
    mongo.db.games.update_one({'_id': id}, {'$set': game_data})

    # Return back id of updated table
    return request.form['id']


@app.route("/game_delete", methods=['POST'])
def game_delete():
    # Check if id entered is valid,
    # display 400 error page if not valid
    if not ObjectId.is_valid(request.form['id']):
        abort(400)

    # Find id in table to see if there is one,
    # display 400 error page if not found
    id = ObjectId(request.form['id'])
    if not bool(mongo.db.games.find_one({"_id": id})):
        abort(400)

    # Delete data in table by id
    mongo.db.games.delete_one({"_id": id})

    # Return back id of deleted data
    return request.form['id']


@app.route("/category_insert", methods=['POST'])
def category_insert():
    # Insert name to table
    x = mongo.db.categories.insert_one({"name": request.form['name']})

    # Return id of newly inserted table
    return str(x.inserted_id)


@app.route("/category_delete", methods=['POST'])
def category_delete():
    # Check if id entered is valid,
    # display 400 error page if not valid
    if not ObjectId.is_valid(request.form['id']):
        abort(400)

    # Find id in table to see if there is one,
    # display 400 error page if not found
    id = ObjectId(request.form['id'])
    if not bool(mongo.db.categories.find_one({"_id": id})):
        abort(400)

    # Update all games using same category id by setting to none (blank)
    games = mongo.db.games.find()
    for game in games:
        if game.get("category") == id:
            mongo.db.games.update_one({'category': id}, {'$set': {"category": ""}})

    # Delete data in table by id
    mongo.db.categories.delete_one({"_id": id})

    # Return back id of deleted data
    return request.form['id']


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=os.environ.get("PORT"),
            debug=False)
