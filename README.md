# Recipe Share(Future Interns (Project 2))

Recipe Share is a full-stack web application that allows users to discover, share, and save their favorite recipes. Users can sign up, log in, and upload recipes complete with ingredients, preparation steps, images, cuisine, and difficulty. The platform also offers powerful search and filtering features, as well as a “favorites” functionality for personalized recipe collections.

## Table of Contents

- [Recipe Share(Future Interns (Project 2))](#recipe-sharefuture-interns-project-2)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [File Structure](#file-structure)
  - [Routes](#routes)
  - [Database Models](#database-models)
  - [Validation \& Security](#validation--security)
  - [Responsive Design \& Theming](#responsive-design--theming)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

- **User Authentication:**
  - User signup, login, and logout.
  - Session management with a 30‑minute expiration.
  - Server‑side and client‑side validation for user details.

- **Recipe Management:**
  - Authenticated users can upload recipes including title, ingredients, preparation steps, cuisine, difficulty, and image URL.
  - Recipe viewing with detailed pages that display ingredients and steps.
  - Ability to mark recipes as favorites and toggle favorite status.

- **Search & Filter:**
  - Search recipes by title.
  - Filter recipes by cuisine and difficulty level.

- **Responsive Design & Theming:**
  - Fully responsive design for mobile, tablet, and desktop.
  - Modern, minimalistic UI with a cohesive color palette.
  - Dark and light theme toggle for personalized user experience.

- **Interactivity & Animations:**
  - Smooth animations for page elements.
  - Interactive share button to copy recipe links to the clipboard with a visual confirmation alert.

## Tech Stack

- **Frontend:**
  - HTML, CSS, JavaScript
  - Google Fonts (Merriweather)
  - Icon libraries (Lucide)

- **Backend:**
  - Flask (Python)

- **Database:**
  - MongoDB with Flask-PyMongo
  - BSON for ObjectId management

- **Other Libraries:**
  - bcrypt for password hashing
  - datetime for session lifetime
  - Various JavaScript enhancements for responsiveness and interactivity

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dohoudaniel/recipe-share.git
   cd recipe-share
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   Create a `.env` file in the project root and set:

   ```env
   MONGODB_URI="mongodb://localhost:27017/recipe_app"
   SECRET_KEY="your-secret-key"
   PORT=5000
   ```

5. **Run the application:**

   ```bash
   python app.py
   ```

6. **Access the app:**
   Open your browser and navigate to `http://localhost:5000`.

## Usage

- **Landing Page:**
  When not logged in, users are presented with a landing page inviting them to sign up.

- **Signup & Login:**
  Users can create an account by providing their first name, last name, valid email, and a secure password (minimum 8 characters, with a number, an uppercase letter, and a lowercase letter).
  Login requires valid credentials; invalid attempts flash an error message.

- **Home Page:**
  Once logged in, users see a home page where they can search, filter recipes by cuisine and difficulty, view recipe cards, mark recipes as favorites, and upload new recipes.

- **Recipe Upload:**
  Authenticated users can upload recipes via a responsive form with client‑side validation ensuring all required fields are filled.
  If validation fails, an error message in red is displayed.

- **Recipe View:**
  Each recipe page displays the recipe title, image, cuisine, difficulty, a list of ingredients, and preparation steps.
  A “Share Recipe” button copies the recipe link to the clipboard and displays a temporary green alert.

## File Structure

```
recipe-share/
├── app.py
├── .env
├── requirements.txt
├── static/
│   ├── css/
│   │   ├── landing.css
│   │   ├── signup.css
│   │   ├── login.css
│   │   ├── home.css
│   │   └── view_recipe.css
│   ├── js/
│   │   ├── landing.js
│   │   ├── signup.js
│   │   ├── login.js
│   │   ├── home.js
│   │   └── view_recipe.js
│   └── images/
│       ├── logos/
│       │   └── logo.jpg
│       └── default_recipe.jpg
├── templates/
│   ├── base.html
│   ├── landing.html
│   ├── signup.html
│   ├── login.html
│   ├── home.html
│   ├── view_recipe.html
│   └── 404.html
└── README.md
```

## Routes

- **/**:
  - For non‑authenticated users: displays the landing page.
  - For authenticated users: displays the home page with search/filter options and recipes.

- **/signup**:
  - GET: Shows the signup page.
  - POST: Processes user registration after validating input.

- **/login**:
  - GET: Shows the login page.
  - POST: Processes user login and sets a session with a 30‑minute lifetime.

- **/logout**:
  - Logs out the user and clears the session.

- **/upload_recipe**:
  - Protected route for uploading recipes.

- **/favorite/<recipe_id>**:
  - Toggles a recipe as favorite or unfavorite for the logged‑in user.

- **/recipe/<recipe_id>**:
  - Displays the full recipe details; gracefully handles invalid or non‑existent IDs by returning a 404 error.

- **404 Error Handler**:
  - Catches unhandled routes and displays a custom 404 page.

## Database Models

- **User Model:**
  Each user document includes:
  - `firstName`, `lastName`
  - `email`
  - `password` (hashed)
  - `favorites` (list of recipe IDs)

- **Recipe Model:**
  Each recipe document includes:
  - `title`
  - `ingredients`
  - `steps`
  - `cuisine`
  - `difficulty`
  - `image_url`
  - `user_id` (reference to the uploader)
  - `favorites` (number count)
  - `clicks` (number count)

## Validation & Security

- **User Input Validation:**
  Both client‑side (using JavaScript) and server‑side (Flask validation) checks ensure:
  - First and last names are at least 2 characters.
  - Email addresses follow a valid format.
  - Passwords are at least 8 characters and contain at least one number, one lowercase letter, and one uppercase letter.

- **Session Management:**
  Sessions expire after 30 minutes of inactivity.

- **Password Security:**
  Passwords are hashed using bcrypt before storage.

- **Invalid URL Handling:**
  When a recipe URL is invalid (or not a proper ObjectId), the app returns a 404 error gracefully.

## Responsive Design & Theming

- **Mobile Responsive:**
  The UI uses CSS media queries to ensure the layout adjusts for mobile, tablet, and desktop screens.
  The navbar collapses into a mobile menu on smaller devices, and input forms adjust their widths.

- **Theme Support:**
  Users can toggle between dark and light themes. The selected theme is stored in localStorage and applied on page load.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Daniel Favour Dohou](https://linktr.ee/dohoudanielfavour).
