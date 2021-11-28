# GameList

## About
I developed a [website](https://fortytwo-gamelist.herokuapp.com) for Code Institute's Backend Development Milestone Project. The website's goal is to allow user to insert, edit and delete list of games.
The website is designed to be simple and easy to use on any platform or scale.

## Index – Table of Contents
* [User Experience (UX)](#user-experience) 
* [Features](#features)
* [Designs](#designs)
* [Technologies Used](#technologies-used)
* [Database](#database)
* [Testing](#testing)
* [Known Bugs](#known-bugs)
* [Deployment](#deployment)

## User Experience

#### Ideal user

##### The ideal user for this website is:
* Anyone searching for a game
* Anyone wanting to share a game

##### Visitors to this website are searching for:
* A game to play
* A game to share

##### This project is the best way to help them achieve these things because:
* Easy to understand
* Very clear
* Quick filter for different types of games by categories

##### User stories
1. As a new user, I want to find a game to play
2. As a new user, I want to share a game for others
3. As a new user, I want to see a specific category of game

## Features

##### List of games
Home page shows list of game titles that can be clicked for more information

##### Infromation of games
Info page shows more infomation about a given game, and can be edited

##### Categories
Categories that can be filtered to only show games in a selected category

## Designs
![Home page](README-files/home.png)
![Category selected](README-files/categories.png)
![Creating new game](README-files/new.png)
![Game created](README-files/edit.png)

## Technologies used
* HTML5
* CSS3
* Javascript
* Python
* [HTML Validator](https://validator.w3.org) for validity of HTML
* [CSS Validator](https://jigsaw.w3.org/css-validator) for validity of CSS
* [PEP8 Validator](http://pep8online.com) for validity of python
* [Bootstrap4](https://getbootstrap.com) for the grid layout, components and styling
* [Google Fonts](https://fonts.google.com/specimen/Exo) for Exo fonts
* [FontAwsome](https://fontawesome.com/) as icon provider
* [Hover](https://ianlunn.github.io/Hover/) for styling effects on mouse hover
* [JQuery](https://jquery.com/) for JavaScript library to simplify HTML DOM manipulation
* [Git](https://git-scm.com) for version control
* [GitHub](https://github.com) for the repository to store the files
* [GitPod](https://gitpod.io) to test and edit the website
* [Heroku](https://dashboard.heroku.com) to deploy the site

## Database
The database chosen for this is a non-relational database hosted on MongoDB.

The application uses 2 database collections, 'categories' and 'games'.

#### games
- _id (Unique identifier as `ObjectId`)
- cost (Price as pounds)
- rating (Rating from `1` to `5` as `Very Bad` to `Very Good`)
- title (Title)
- desp (Infromation)
- category (Category this game is with as `ObjectId` pointing to `categories._id`)

#### categories
- _id (Unique identifier as `ObjectId`)
- name (Name)

## Testing
| Test Label | Test Action | Expected Outcome | Test Outcome |
| --- | --- | --- | --- |
| HTML Validator | Check for any warnings or errors at [HTML Validator](https://validator.w3.org/) | No warnings or errors reported | PASS |
| CSS Validator | Check for any warnings or errors at [CSS Validator](https://jigsaw.w3.org/css-validator/) | No warnings or errors reported | PASS |
| PEP8 Validator | Check for any warnings or errors at [PEP8 Validator](http://pep8online.com) | No warnings or errors reported | PASS |
| Opening home browser | Opening the home website browser by google chrone, microsoft edge and phones | Home website can be opened | PASS |
| Screen Size | Resizing all website screens for any sizes above 300 pixels | All websites is responsive when screen changes size to fit | PASS |
| Select game | Clicking one of the game in home page | Opens info page on selected game | PASS |
| Select home | Clicking "Home Page" in any of pages at header | Opens to home page | PASS |
| Open new page | Clicking "Add new Game" button in any pages at header | Opens new page | PASS |
| Enter new information | Entering infromations on new page | Infromations can be inserted | PASS |
| Cancel new game | Clicking "Cancel" button in new page | New game not created and returns to home page | PASS |
| Create new game | Clicking "Create" button in new page | New game created and opens to created game page | PASS |
| Start edit | Clicking "Edit" in info page | Game infromation now editable | PASS |
| Cancel edit | Clicking "Cancel" in info page | Game infomation now not editable and changes not saved | PASS |
| Save edit | Clicking "Save" in info page | Game infomation now not editable and changes saved | PASS |
| Delete game | Clicking "Delete" in info page | Alert page to confirm delete shows | PASS |
| Cancel delete game | Clicking "Cancel" in delete confirmation | Alert page gone and no changes made | PASS |
| Confirm delete game | Clicking ok in delete confirmation | Game deleted and returned to home page | PASS |
| Enter category | Clicking "Add Category" button | Text button can now be entered | PASS |
| Cancel category | Exiting add category text with nothing entered | New category text returned with no category made | PASS |
| Create category | Exiting add category text with something entered | New category made | PASS |
| Select category | Clicking one of category button | Game list filtered to only display with selected category | PASS |
| Delete category | Clicking one of category X button | Alert page to confirm delete shows | PASS |
| Cancel category game | Clicking cancel in delete confirmation | Alert page gone and no changes made | PASS |
| Confirm category game | Clicking ok in delete confirmation | Category deleted | PASS |

## Known Bugs
There are currently no known bugs

## Deployment

#### Adding and Committing files
To add files to the repository take the following steps

In the command line type -
        git add .  
        git commit -m "This is being committed"
        git push

To add all new files or modified file use " ."  - To add a single file use the pathway to the file eg .index.html  or assets/css/style.css
When committing make sure your comments are clear about what changes have been made. 
Pushing will send your work to the repository

#### Heroku Deployment

To deploy to heroku, take the following steps:


1. Create a `requirements.txt` file using the terminal command `pip freeze > requirements.txt`.
2. Create a `Procfile` with the terminal command `echo web: python app.py > Procfile`.
3. `git add` and `git commit` the new requirements and Procfile and then `git push` the project to GitHub.
3. Create a new app on the [Heroku website](https://dashboard.heroku.com/apps) by clicking the "New" button in your dashboard. Give it a name and set the region to Europe.
4. From the heroku dashboard of your newly created application, click on "Deploy" > "Deployment method" and select GitHub.
5. Confirm the linking of the heroku app to the correct GitHub repository.
6. In the heroku dashboard for the application, click on "Settings" > "Reveal Config Vars".
7. Set the following config vars:
| Key | Value |
 --- | ---
DEBUG | FALSE
IP | 0.0.0.0
MONGO_URI | `mongodb+srv://<username>:<password>@<cluster_name>-qtxun.mongodb.net/<database_name>?retryWrites=true&w=majority`
PORT | 5000
SECRET_KEY | `<your_secret_key>`
- To get you MONGO_URI read the MongoDB Atlas documentation [here](https://docs.atlas.mongodb.com/)

8. In the heroku dashboard, click "Deploy".
9. In the "Manual Deployment" section of this page, made sure the master branch is selected and then click "Deploy Branch".
10. The site is now successfully deployed.

#### Forking
By forking the GitHub Repository, you can make a copy of the original repository in your own GitHub account.  This means we can view or make changes without making the changes affecting the original.

* Log into GitHub and locate the GitHub Repository.
* At the top of the Repository there is a "Fork" button about the "Settings" button on the menu.
* You should now have a new copy of the original repository in your own GitHub account.

### Cloning
* Log into your GitHub then find the gitpod repository
* Under the repository name there is a button that says "Clone or download". Click on this button.
* If cloning with HTTPS "Clone with HTTPS", copy this link.
* Open Gitbash
* Change the current working directory to the location where you want the cloned directory to be.
* Type git clone, and then paste the URL you copied earlier.

        $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
        Press - Enter- Your local clone will be created.
        $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
                > Cloning into `CI-Clone`...
                > remote: Counting objects: 10, done.
                > remote: Compressing objects: 100% (8/8), done.
                > remove: Total 10 (delta 1), reused 10 (delta 1)
                > Unpacking objects: 100% (10/10), done.
[Click Here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) for more info on cloning. 