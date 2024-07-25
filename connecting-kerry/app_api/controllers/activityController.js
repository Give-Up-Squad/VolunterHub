const {
  getNonAppliedActivityByID,
  getNonCreatedActivityByID,
  getAllActivities,
  applyActivityForVol,
  getActivitiesByVolID,
  getActivitiesByOrgID,
  createActivity,
  cancelActivityForOrg,
  cancelActivityForVol,
  getPendingActivites,
  updateActivityApprovalStatus,
  getActivityByID,
  getOrganisationEmailByID,
} = require("../models/activityModel");
const sendEmail = require("../emailService");

const displayNonAppliedActivitiesByID = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await getNonAppliedActivityByID(id);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const displayNonCreatedActivitiesByID = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await getNonCreatedActivityByID(id);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const displayAllActivities = async (req, res) => {
  try {
    const activities = await getAllActivities();

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const applyActivity = async (req, res) => {
  const { email, activity_id } = req.body;

  if (!email || !activity_id) {
    return res
      .status(400)
      .json({ error: "Email and activity_id are required" });
  }

  try {
    await applyActivityForVol(email, activity_id);
    res.status(201).json({ message: "Activity applied successfully" });
  } catch (error) {
    console.error("Error applying activity:", error.message);
    res.status(500).json({ error: "Failed to apply activity" });
  }
};

const displayVolAppliedActivities = async (req, res) => {
  const id = req.params.id;
  let activity_status = req.query.status;

  if (
    activity_status &&
    activity_status !== "Upcoming" &&
    activity_status !== "Cancelled"
  ) {
    return res.status(400).json({ error: "Invalid activity status" });
  }

  try {
    const activities = await getActivitiesByVolID(id, activity_status);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activities:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const volunteerCancel = async (req, res) => {
  const { volunteer_id, activity_id } = req.body;

  if (!volunteer_id || !activity_id) {
    return res
      .status(400)
      .json({ error: "Volunteer ID and activity ID are required" });
  }

  try {
    await cancelActivityForVol(volunteer_id, activity_id);
    res.status(200).json({ message: "Activity cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling activity:", error.message);
    res.status(500).json({ error: "Failed to cancel activity" });
  }
};

const displayOrgCreatedActivities = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await getActivitiesByOrgID(id);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const createVolunteeringActivity = async (req, res) => {
  const {
    activity_name,
    activity_description,
    activity_start_date,
    activity_end_date,
    activity_deadline,
    max_participants,
    min_participants,
    available_participants,
    org_id,
    activity_status,
    activity_location,
    activity_image,
    activity_approval_status,
  } = req.body;

  try {
    await createActivity({
      activity_name,
      activity_description,
      activity_start_date,
      activity_end_date,
      activity_deadline,
      max_participants,
      min_participants,
      available_participants,
      org_id,
      activity_status,
      activity_location,
      activity_image,
      activity_approval_status,
    });

    res.status(201).json({ message: "Activity created successfully" });
  } catch (error) {
    console.error("Error creating activity:", error.message);
    res.status(500).json({ error: "Failed to create activity" });
  }
};

const displayPendingApprovals = async (req, res) => {
  try {
    const activities = await getPendingActivites();

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
  }
};

const approveActivity = async (req, res) => {
  const { activity_id } = req.params;

  if (!activity_id) {
    return res.status(400).json({ error: "activity_id is required" });
  }

  try {
    await updateActivityApprovalStatus(activity_id, "Approved");

    const activity = await getActivityByID(activity_id);
    console.log("Activity:", activity);
    const orgEmail = await getOrganisationEmailByID(activity.org_id);

    // await sendEmail(
    //   orgEmail,
    //   "Activity Approved",
    //   `Your activity "${activity.activity_name}" has been approved.`
    // );

    res
      .status(200)
      .json({ message: "Activity approved and email sent successfully" });
  } catch (error) {
    console.error("Error approving activity:", error.message);
    res.status(500).json({ error: "Failed to approve activity" });
  }
};

const rejectActivity = async (req, res) => {
  const { activity_id } = req.params;

  if (!activity_id) {
    return res.status(400).json({ error: "activity_id is required" });
  }

  try {
    await updateActivityApprovalStatus(activity_id, "Rejected");

    const activity = await getActivityByID(activity_id);
    console.log("Activity:", activity);
    const orgEmail = await getOrganisationEmailByID(activity.org_id);

    // await sendEmail(
    //   orgEmail,
    //   "Activity Rejected",
    //   `Your activity "${activity.activity_name}" has been rejected.`
    // );

    res
      .status(200)
      .json({ message: "Activity rejected and email successfully" });
  } catch (error) {
    console.error("Error rejecting activity:", error.message);
    res.status(500).json({ error: "Failed to reject activity" });
  }
};

module.exports = {
  displayAllActivities,
  displayNonAppliedActivitiesByID,
  displayNonCreatedActivitiesByID,
  displayOrgCreatedActivities,
  displayVolAppliedActivities,
  applyActivity,
  createVolunteeringActivity,
  volunteerCancel,
  displayPendingApprovals,
  approveActivity,
  rejectActivity,
};
