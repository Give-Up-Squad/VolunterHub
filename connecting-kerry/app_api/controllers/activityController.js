const {
  getAllActivitiesByID,
  getAllActivities,
  updateAvailableParticipants,
  getActivitiesByVolID,
  createVolActivity,
  getActivitiesByOrgID,
  createActivity,
  cancelActicityForOrg,
  cancelActivityForVol,
  getPendingActivites,
} = require("../models/activityModel");

const displayAllActivitiesByID = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await getAllActivitiesByID(id);

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
  const { volunteer_id, activity_id } = req.body;

  try {
    await createVolActivity(volunteer_id, activity_id);
    await updateAvailableParticipants(activity_id);

    res.status(201).json({
      message: "Vol_Activity created and participants updated successfully",
    });
  } catch (error) {
    console.error("Error applying activity:", error.message);
    res.status(500).json({ error: "Failed to apply activity" });
  }
};

const displayVolAppliedAvtivities = async (req, res) => {
  const id = req.params.id;
  try {
    const activities = await getActivitiesByVolID(id);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ error: "No activities" });
    }

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error displaying activites:", error.message);
    res.status(500).json({ error: "Failed to fetch activities data" });
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

const createVolunteerActivity = async (req, res) => {
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

const volunteerCancel = async (req, res) => {
  const { volunteer_id, activity_id } = req.body;

  if (!volunteer_id || !activity_id) {
    return res
      .status(400)
      .json({ error: "volunteer_id and activity_id are required" });
  }

  try {
    await cancelActivityForVol(volunteer_id, activity_id);

    res.status(200).json({ message: "Activity cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling activity:", error.message);
    res.status(500).json({ error: "Failed to cancel activity" });
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

module.exports = {
  displayAllActivities,
  displayAllActivitiesByID,
  displayOrgCreatedActivities,
  displayVolAppliedAvtivities,
  applyActivity,
  createVolunteerActivity,
  volunteerCancel,
  displayPendingApprovals,
};
