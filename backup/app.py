"""
app.py - Main application file for the Recipe Sharing Site.
Features:
- User signup, login, logout.
- Authenticated users can upload recipes (with ingredients, steps, images, cuisine, and difficulty).
- Search and filter recipes by cuisine or difficulty.
- Users can mark recipes as favorites.
- Route protection and custom 404 error handling.
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash, abort
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import bcrypt
import os

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGODB_URI", "mongodb://localhost:27017/recipe_app")
app.secret_key = os.environ.get("SECRET_KEY", "your-secret-key")

mongo = PyMongo(app)

# Helper: Login required decorator
def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            flash("You must be logged in to access that page.", "error")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated_function

# ROUTE: Home / Landing Page
@app.route("/")
def index():
    if "user_id" in session:
        # User is logged in; show home page with recipes.
        search_query = request.args.get("q", "")
        cuisine_filter = request.args.get("cuisine", "")
        difficulty_filter = request.args.get("difficulty", "")
        query = {}
        if search_query:
            query["title"] = {"$regex": search_query, "$options": "i"}
        if cuisine_filter:
            query["cuisine"] = cuisine_filter
        if difficulty_filter:
            query["difficulty"] = difficulty_filter
        recipes = list(mongo.db.recipes.find(query))
        # Fetch user's favorites
        user = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
        favorites = user.get("favorites", []) if user else []
        return render_template("home.html", recipes=recipes, favorites=favorites,
                               search=search_query, cuisine=cuisine_filter, difficulty=difficulty_filter)
    else:
        return render_template("landing.html")

# ROUTE: Signup
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if "user_id" in session:
        return redirect(url_for("index"))
    if request.method == "POST":
        firstName = request.form.get("firstName")
        lastName = request.form.get("lastName")
        email = request.form.get("email")
        password = request.form.get("password")
        # Basic validation
        if not all([firstName, lastName, email, password]):
            flash("All fields are required.", "error")
            return redirect(url_for("signup"))
        if mongo.db.users.find_one({"email": email}):
            flash("Email is already registered.", "error")
            return redirect(url_for("signup"))
        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        user_id = mongo.db.users.insert_one({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": hashed,
            "favorites": []
        }).inserted_id
        flash("Signup successful. Please log in.", "success")
        return redirect(url_for("login"))
    return render_template("signup.html")

# ROUTE: Login
@app.route("/login", methods=["GET", "POST"])
def login():
    if "user_id" in session:
        return redirect(url_for("index"))
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = mongo.db.users.find_one({"email": email})
        if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            session["user_id"] = str(user["_id"])
            return redirect(url_for("index"))
        else:
            flash("Invalid email or password.", "error")
            return redirect(url_for("login"))
    return render_template("login.html")

# ROUTE: Logout
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# ROUTE: Upload Recipe (Protected)
@app.route("/upload_recipe", methods=["GET", "POST"])
@login_required
def upload_recipe():
    if request.method == "POST":
        title = request.form.get("title")
        ingredients = request.form.get("ingredients")
        steps = request.form.get("steps")
        cuisine = request.form.get("cuisine")
        difficulty = request.form.get("difficulty")
        image_url = request.form.get("image_url")  # For simplicity, we assume a URL is provided
        if not title:
            flash("Title is required.", "error")
            return redirect(url_for("upload_recipe"))
        recipe = {
            "title": title,
            "ingredients": ingredients,
            "steps": steps,
            "cuisine": cuisine,
            "difficulty": difficulty,
            "image_url": image_url,
            "user_id": ObjectId(session["user_id"]),
            "favorites": 0,
            "clicks": 0
        }
        mongo.db.recipes.insert_one(recipe)
        flash("Recipe uploaded successfully!", "success")
        return redirect(url_for("index"))
    return render_template("upload_recipe.html")

# ROUTE: Toggle Favorite (Protected)
@app.route("/favorite/<recipe_id>")
@login_required
def favorite(recipe_id):
    user = mongo.db.users.find_one({"_id": ObjectId(session["user_id"])})
    if not user.get("favorites"):
        user["favorites"] = []
    if recipe_id in user["favorites"]:
        mongo.db.users.update_one({"_id": ObjectId(session["user_id"])}, {"$pull": {"favorites": recipe_id}})
    else:
        mongo.db.users.update_one({"_id": ObjectId(session["user_id"])}, {"$push": {"favorites": recipe_id}})
    return redirect(url_for("index"))

# ROUTE: View Recipe (Optional)
@app.route("/recipe/<recipe_id>")
def view_recipe(recipe_id):
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if not recipe:
        abort(404)
    return render_template("view_recipe.html", recipe=recipe)

# ERROR HANDLER: 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    app.run(host="0.0.0.0", port=port, debug=True)
