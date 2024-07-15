const express = require("express");
const { registerUser, displayUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/display/:email", displayUser);
module.exports = router;
