const express = require("express");
const {
  login,
  logout,
  registerUser,
  checkSession,
  protectedRoute,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/register", registerUser);

router.get("/protected", checkSession, protectedRoute);

module.exports = router;
