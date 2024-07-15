const { pool } = require("../config/database");

const getAllActivitiesByID = async (id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_all_activities_data_by_id($1) WHERE activity_deadline > NOW()
    `;
    const params = [id];
    const { rows } = await client.query(queryText, params);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const getAllActivities = async () => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_all_activities_data() WHERE activity_deadline > NOW()
    `;
    const { rows } = await client.query(queryText);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { getAllActivitiesByID, getAllActivities };
