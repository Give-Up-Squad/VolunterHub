const express = require("express");
const {
  displayAllActivities,
  displayAllActivitiesByID,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);
router.get("/display/:id", displayAllActivitiesByID);

module.exports = router;
