const express = require("express");
const {
  displayAllActivities,
  displayAllActivitiesByID,
  displayVolAppliedAvtivities,
  displayOrgCreatedActivities,
  applyActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);
router.get("/display/:id", displayAllActivitiesByID);
router.get("/volunteer/:id", displayVolAppliedAvtivities);
router.get("/organisation/:id", displayOrgCreatedActivities);
router.post("/apply", applyActivity);

module.exports = router;
