const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const db = require('./util/database');

function createSSOServer(options = {}) {
  const app = express();
  
  const PORT = options.port || 3000;
  const SECRET_KEY = options.jwtSecret || "sso_secret_key";
  const SESSION_SECRET = options.sessionSecret || "session_secret_key";

  const tokenStore = new Map();
  const newmap = new Map();

  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: options.emailUser,
      pass: options.emailPass
    }
  });

  app.use(cors({
    origin: options.allowedOrigins || ['http://localhost:8080', 'http://localhost:5000'],
    credentials: true
  }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  
  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  }));
  app.use(flash());

  // All your routes go here
  // Example:
  app.get('/', (req, res) => {
    res.render('dashboard', { user: req.session.userId ? true : false, email: req.query.email, guid: req.query.guid });
  });

  // Copy your full /login, /signup, /sso, /verify, /tokenverify, /logout, /session code here
  // inside this createSSOServer function
  
  return app;
}

module.exports = createSSOServer;
