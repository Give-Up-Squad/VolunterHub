const {
  getAllActivitiesByID,
  getAllActivities,
  updateAvailableParticipants,
  getActivitiesByVolID,
  createVolActivity,
  getActivitiesByOrgID,
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

module.exports = {
  displayAllActivities,
  displayAllActivitiesByID,
  displayOrgCreatedActivities,
  displayVolAppliedAvtivities,
  applyActivity,
};
