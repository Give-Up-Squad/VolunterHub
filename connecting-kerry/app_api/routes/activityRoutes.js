const express = require("express");
const {
  displayAllActivities,
  displayNonAppliedActivitiesByID,
  displayNonCreatedActivitiesByID,
  displayVolAppliedActivities,
  displayOrgCreatedActivities,
  applyActivity,
  createVolunteeringActivity,
  volunteerCancel,
  displayPendingApprovals,
  approveActivity,
  rejectActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/display", displayAllActivities);

router.get("/volunteer/:id", displayVolAppliedActivities);
router.post("/apply", applyActivity);
router.post("/volunteer/cancel", volunteerCancel);
router.get("/volunteer/display/:id", displayNonAppliedActivitiesByID);

router.get("/organisation/:id", displayOrgCreatedActivities);
router.post("/create", createVolunteeringActivity);
router.get("/organisation/display/:id", displayNonCreatedActivitiesByID);

router.get("/pending", displayPendingApprovals);
router.get("/approve/:activity_id", approveActivity);
router.get("/reject/:activity_id", rejectActivity);

module.exports = router;
