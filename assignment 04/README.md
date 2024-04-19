## Sign up for our newsletter
This week, I want to create a newsletter subscription feature for architecture and landscape design articles and services.
The admin.hbs file serves as the HTML page for managing subscriptions, where the form tags are used for submitting, deleting, and editing email addresses.

* [Glitch](https://dynamic-web-sign-up-email.glitch.me/)
* SQLite reference [Glitch template](https://glitch.com/edit/#!/hammerhead-rich-danthus)

## Setting Up and Running the Application
Local Setup:

* Make sure Node.js is installed on your system.
* Create a project directory and initialize it with npm init.
* Install the necessary packages using npm:
* npm install express body-parser sqlite3 express-handlebars hbs
* Place your code files (server.js, package.json, etc.) in the correct structure within your project directory.
* Run the application using npm start or node server.js.

## Database:
The SQLite database is in memory, so it will be fresh each time you start the application.
Your server.js file contains code to create an Emails table, which will store the email addresses submitted.

#### Endpoints:
* GET /: Retrieves and displays the admin page with the list of emails.
* POST /submit-email: Accepts an email address from the form and inserts it into the database.
* POST /delete-email: Deletes an email from the database.
* POST /edit-email: Updates an existing email in the database.
* Handlebars (hbs):

I'm using Handlebars as my template engine.
Handlebars files have the extension .hbs and are located in the views directory.
My admin.hbs file is the template for the admin page, allowing for dynamic content insertion with {{placeholders}}.


