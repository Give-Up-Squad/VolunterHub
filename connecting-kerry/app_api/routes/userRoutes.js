const express = require("express");
const {
  registerUser,
  displayUser,
  displayAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/display", displayAllUsers);
router.get("/display/:email", displayUser);
module.exports = router;
