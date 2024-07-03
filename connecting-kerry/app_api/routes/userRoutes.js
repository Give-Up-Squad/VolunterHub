const express = require("express");
const {
  login,
  logout,
  registerUser,
  checkSession,
  protectedRoute,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
