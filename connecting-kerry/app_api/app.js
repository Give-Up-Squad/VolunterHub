const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const firebase = require("firebase-admin");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: `${process.env.FRONTEND_URL_PATH}`, //added env var
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies to be sent with requests
};

// Middleware setup
app.use(cors(corsOptions));
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

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);

module.exports = app;
