const express = require("express");
const {
  displayAllActivities,
  displayAllActivitiesByID,
  displayVolAppliedAvtivities,
  applyActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);
router.get("/display/:id", displayAllActivitiesByID);
router.get("/volunteer/:id", displayVolAppliedAvtivities);
router.post("/apply", applyActivity);

module.exports = router;
