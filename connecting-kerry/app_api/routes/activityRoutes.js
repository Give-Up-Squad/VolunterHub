const express = require("express");
const {
  displayAllActivities,
  displayAllActivitiesByID,
  displayVolAppliedAvtivities,
  displayOrgCreatedActivities,
  applyActivity,
  createVolunteerActivity,
  volunteerCancel,
  displayPendingApprovals,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);
router.get("/display/:id", displayAllActivitiesByID);
router.get("/volunteer/:id", displayVolAppliedAvtivities);
router.get("/organisation/:id", displayOrgCreatedActivities);
router.post("/apply", applyActivity);
router.post("/create", createVolunteerActivity);
router.post("/cancel", volunteerCancel);
router.get("/pending", displayPendingApprovals);

module.exports = router;
