# Final Dynamic Web 
## Design your space
This project combines the final with my other class, Handheld Creative Tools. The project is built on Node.js and Express.js, with Replit used for development and deployment. I utilizes Multer for file handling, the @replit/database for simple data storage, and Google Cloud Storage for image hosting.


Replit link [https://hh-final-design-your-space-2-panitankasin.replit.app/](https://hh-final-design-your-space-2-panitankasin.replit.app/) 

This project shows the frontend communicates with the backend using HTTP methods: GET, POST, and DELETE. These represent fetching data, uploading new data, and deleting existing data, respectively. Also,it shows how data flows from the frontend to the backend, then to the database, and back to the frontend as responses to API requests.

  
![p1](https://github.com/PanithanPenny/ITP-Dynamic-Web/assets/143921260/29d2f558-23d6-4570-931d-8f98c1f82a41)
![p3](https://github.com/PanithanPenny/ITP-Dynamic-Web/assets/143921260/b4894b6f-3f5a-4f37-bd37-39e30665e759)

## Setting Up and Running the Application
Local Setup:
* Make sure Node.js is installed on your system.
* Create a project directory and initialize it with npm init.
* Install the necessary packages using npm:
* npm install express body-parser sqlite3 express-handlebars hbs
* Place code files (server.js, package.json, etc.) in the correct structure within your project directory.
* Run the application using npm start or node server.js.

## Server and Database:
Node.js and Express.js

Middleware and Libraries:
* Multer: This is a middleware for handling multipart/form-data, which is primarily used for uploading files. In my project, it handles image uploads.
* @replit/database: This is used to interact with Replit's built-in database feature, providing a simple key-value store to manage data such as image URLs.
* Google Cloud Storage: The application uses Google Cloud Storage for storing uploaded images, facilitated by the @google-cloud/storage package. This choice is appropriate for scalable, durable, and highly available storage for your user-generated content.

## API Endpoints:
* GET /api/listPosts: Fetches a list of image URLs from the database to display previously uploaded images.
* POST /api/uploadImage: Handles the uploading of new images to Google Cloud Storage and stores the URLs in the database.
* DELETE /api/deletePost/:index: Removes an image URL from the database based on the specified index. Does not delete the image from Google Cloud Storage.


![p6](https://github.com/PanithanPenny/ITP-Dynamic-Web/assets/143921260/177d373a-7930-4a5f-8bda-857a6fe5fe5c)
![p7](https://github.com/PanithanPenny/ITP-Dynamic-Web/assets/143921260/8fda8678-ae4e-4dbf-a466-620c78f3ace5)



