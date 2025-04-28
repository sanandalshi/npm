Simple SSO Server
A lightweight Single Sign-On (SSO) server built with Node.js, Express, EJS, MySQL, and JWT. This npm package allows developers to quickly set up an SSO server with user signup, login, and dashboard functionality, complete with secure session management and email verification support.

Features
User Authentication: Secure signup and login with bcrypt password hashing.
JWT-based SSO: Generate and verify JSON Web Tokens for seamless SSO across applications.
EJS Templates: Pre-built signup, login, and dashboard pages.
MySQL Integration: Store user data securely with a MySQL database.
Session Management: Uses express-session for secure session handling.
Email Notifications: Supports email verification using nodemailer.
Configurable: Easily customize ports, secrets, and allowed origins.
CORS Support: Configurable CORS for cross-origin requests.
Installation
Install the package via npm:
bash

Copy
npm install simple-sso-server
Ensure you have MySQL installed and a database set up.
Create a MySQL database and update the configuration in your application (see Usage below).
Usage
To set up and run the SSO server, create a new Node.js application and configure the simple-sso-server package.

Example
javascript

Copy
const createSSOServer = require('simple-sso-server');

const app = createSSOServer({
  port: 4000,
  jwtSecret: 'your_jwt_secret',
  sessionSecret: 'your_session_secret',
  emailUser: 'yourgmail@gmail.com',
  emailPass: 'your_email_app_password',
  allowedOrigins: ['http://localhost:3000', 'http://localhost:5000'],
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password',
    database: 'your_database_name'
  }
});

app.listen(4000, () => {
  console.log('SSO Server running on port 4000');
});
Configuration Options
Option	Description	Default Value
port	Port for the SSO server to listen on.	3000
jwtSecret	Secret key for signing JWTs.	sso_secret_key
sessionSecret	Secret key for session management.	session_secret_key
emailUser	Email address for sending verification emails (e.g., Gmail).	None (required)
emailPass	App-specific password for the email account.	None (required)
allowedOrigins	Array of allowed origins for CORS.	['http://localhost:8080', 'http://localhost:5000']
mysql	MySQL connection details (host, user, password, database).	None (required)
Database Setup
Create a MySQL database and table for users. Example schema:

sql

Copy
CREATE DATABASE sso_db;
USE sso_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Update the mysql configuration in your application to match your database settings.

Routes
The SSO server provides the following routes:

GET /: Renders the dashboard (dashboard.ejs).
GET /login: Renders the login page (login.ejs).
POST /login: Handles login form submission.
GET /signup: Renders the signup page (signup.ejs).
POST /valid: Handles signup form submission.
GET /logout: Logs out the user and clears the session.
GET /sso: Initiates SSO flow with JWT generation.
GET /verify: Verifies JWT tokens.
GET /tokenverify: Verifies tokens for specific use cases.
GET /session: Checks session status.
EJS Templates
The package includes three EJS templates:

login.ejs: Login form with email and password fields.
signup.ejs: Signup form with email and password fields.
dashboard.ejs: Dashboard displaying user information or login prompt.
These templates are located in the src/views/ directory of the package and can be customized by overriding the views path in your Express app.

Dependencies
express: Web framework for Node.js.
ejs: Templating engine for rendering views.
mysql2: MySQL client for Node.js.
jsonwebtoken: For generating and verifying JWTs.
bcrypt: For password hashing.
express-session: For session management.
nodemailer: For sending emails.
cors: For handling cross-origin requests.
body-parser: For parsing request bodies.
cookie-parser: For parsing cookies.
connect-flash: For flash messages.
See package.json for the full list and versions.

Folder Structure
text

Copy
simple-sso-server/
├── src/
│   ├── server.js           # Main Express app logic
│   ├── views/              # EJS templates
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │   └── dashboard.ejs
│   └── util/
│       └── database.js     # MySQL connection utility
├── package.json            # Package metadata
├── README.md               # This file
├── .gitignore              # Git ignore file
Publishing to npm (Optional)
To publish your package to npm:

Ensure you have an npm account and are logged in:
bash

Copy
npm login
Run the publish command:
bash

Copy
npm publish
Note: If you want to publish privately or to a specific scope, update the name in package.json (e.g., @yourusername/simple-sso-server) and configure npm accordingly.

Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
[Your Name]

Support
For issues or questions, please open an issue on the  or contact [your.email@example.com].

Notes
Replace [Your Name] and [your.email@example.com] with your actual details.
Update the GitHub repository link (#) once you create a repository for the project.
If you haven't created a .gitignore file yet, here's a simple one to include:
text

Copy
node_modules/
.env
*.log
