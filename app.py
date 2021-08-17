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
    games = mongo.db.games.find()
    categories = mongo.db.categories.find()
    return render_template("index.html", games=games, categories=categories)

@app.route("/new")
def new():
    categories = mongo.db.categories.find()
    return render_template("new.html", categories=categories)

@app.route("/info/<id>")
def info(id):
    game = mongo.db.games.find_one({"_id": ObjectId(id)})
    if not ObjectId.is_valid(id):
        abort(404)

    game = mongo.db.games.find_one_or_404({"_id": ObjectId(id)})
    categories = mongo.db.categories.find()
    return render_template("info.html", game=game, categories=categories)

@app.route("/game_insert", methods=['POST'])
def game_insert():
    category = request.form['category']
    if (category != ""):
        category = ObjectId(category)
    
    game_data = {
        "title": request.form['title'],
        "cost": request.form['cost'],
        "rating": request.form['rating'],
        "category": category,
        "desp": request.form['desp']
    }

    x = mongo.db.games.insert_one(game_data)
    return str(x.inserted_id)

@app.route("/game_update", methods=['POST'])
def game_update():
    if not ObjectId.is_valid(request.form['id']):
        abort(404)
    
    category = request.form['category']
    if (category != ""):
        category = ObjectId(category)
    
    game_data = {
        "title": request.form['title'],
        "cost": request.form['cost'],
        "rating": request.form['rating'],
        "category": category,
        "desp": request.form['desp']
    }

    mongo.db.games.update_one_or_404({'_id': ObjectId(request.form['id'])}, {'$set': game_data})
    return request.form['id']

@app.route("/game_delete", methods=['POST'])
def game_delete():
    mongo.db.games.delete_one({"_id": ObjectId(request.form['id'])})
    return request.form['id']

@app.route("/category_insert", methods=['POST'])
def category_insert():
    x = mongo.db.categories.insert_one({"name": request.form['name']})
    return str(x.inserted_id)

@app.route("/category_delete", methods=['POST'])
def category_delete():
    mongo.db.games.update_many({'category': ObjectId(request.form['id'])}, {'$set': {"category": ""}})
    mongo.db.categories.delete_one({"_id": ObjectId(request.form['id'])})
    return request.form['id']

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=os.environ.get("PORT"),
            debug=True)