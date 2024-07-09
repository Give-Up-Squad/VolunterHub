const {
  getAllActivitiesByID,
  getAllActivities,
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

module.exports = { displayAllActivities, displayAllActivitiesByID };
