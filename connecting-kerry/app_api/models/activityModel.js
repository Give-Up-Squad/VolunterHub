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

const getActivitiesByOrgID = async (org_id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_activities_by_org_id($1) WHERE activity_status = 'Upcoming' ORDER BY activity_start_date
    `;
    const params = [org_id];
    const { rows } = await client.query(queryText, params);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const getActivitiesByVolID = async (volunteer_id) => {
  const client = await pool.connect();
  try {
    const queryText = `
      SELECT * FROM  get_activities_by_volunteer_id($1) WHERE activity_start_date > NOW() ORDER BY activity_start_date
    `;
    const params = [volunteer_id];
    const { rows } = await client.query(queryText, params);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const updateAvailableParticipants = async (activity_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fetchQueryText = `
      SELECT available_participants
      FROM activities
      WHERE activity_id = $1 FOR UPDATE
    `;
    const fetchResult = await client.query(fetchQueryText, [activity_id]);
    const availableParticipants = fetchResult.rows[0]?.available_participants;

    if (availableParticipants > 0) {
      const updateQueryText = `
        UPDATE activities
        SET available_participants = available_participants - 1
        WHERE activity_id = $1
      `;
      await client.query(updateQueryText, [activity_id]);
      await client.query("COMMIT");
    } else {
      throw new Error("No available participants left.");
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating available participants:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const createVolActivity = async (volunteer_id, activity_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const checkVolunteerQuery = `
      SELECT volunteer_id FROM volunteers WHERE volunteer_id = $1
    `;
    const checkResult = await client.query(checkVolunteerQuery, [volunteer_id]);
    if (checkResult.rows.length === 0) {
      throw new Error(`Volunteer with id ${volunteer_id} does not exist.`);
    }

    const queryText = `
      INSERT INTO volunteer_activity (volunteer_id, activity_id, activity_application_date)
      VALUES ($1, $2, NOW())
    `;
    const params = [volunteer_id, activity_id];
    await client.query(queryText, params);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating volunteer activity:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const createActivity = async (activity) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const queryText = `
      INSERT INTO activities (activity_name, activity_description, activity_deadline, activity_location, available_participants)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const params = [
      activity.activity_name,
      activity.activity_description,
      activity.activity_deadline,
      activity.activity_location,
      activity.available_participants,
    ];
    await client.query(queryText, params);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating activity:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getAllActivitiesByID,
  getAllActivities,
  getActivitiesByVolID,
  createActivity,
  createVolActivity,
  updateAvailableParticipants,
  getActivitiesByOrgID,
};
