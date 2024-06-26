const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const firebase = require("firebase-admin");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
      expires: 0, // This ensures the cookie expires when the browser is closed
    },
  })
);

// Initialize Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
});

app.use(express.json());
// Use the user routes
app.use("/api/users", userRoutes);

module.exports = app;
