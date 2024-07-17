const express = require("express");
const {
  displayAllActivities,
  displayAllActivitiesByID,
  displayVolAppliedAvtivities,
  displayOrgCreatedActivities,
  applyActivity,
  createVolunteerActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);
router.get("/display/:id", displayAllActivitiesByID);
router.get("/volunteer/:id", displayVolAppliedAvtivities);
router.get("/organisation/:id", displayOrgCreatedActivities);
router.post("/apply", applyActivity);
router.post("/create", createVolunteerActivity);

module.exports = router;
