const { pool } = require("../config/database");
const { get } = require("../routes/activityRoutes");

const getNonAppliedActivityByID = async (id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_non_applied_activities_data_by_id($1) WHERE activity_deadline > NOW()
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

const getNonCreatedActivityByID = async (id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_non_created_activities_data_by_id($1) WHERE activity_deadline > NOW()
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
    // const queryText = `
    //   SELECT * FROM get_activities_by_org_id($1) WHERE activity_status = 'Upcoming' ORDER BY activity_start_date
    // `;
    const queryText = `
      SELECT
        a.activity_id,
        a.activity_name,
        a.activity_description,
        a.activity_start_date,
        a.activity_end_date,
        a.activity_deadline,
        a.max_participants,
        a.min_participants,
        a.available_participants,
        a.org_id,
        a.activity_status,
        a.activity_location,
        a.activity_image,
        a.activity_approval_status
      FROM
        activities AS a
      WHERE
        a.org_id = $1 
      ORDER BY
        -- Sort first by whether the activity is upcoming or past
        CASE
          WHEN a.activity_start_date >= CURRENT_DATE THEN 1
          ELSE 2
        END,
        -- For upcoming activities, sort by start date in ascending order
        CASE
          WHEN a.activity_start_date >= CURRENT_DATE THEN a.activity_start_date
          ELSE NULL
        END ASC,
        -- For past activities, sort by end date in ascending order
        CASE
          WHEN a.activity_start_date < CURRENT_DATE THEN a.activity_end_date
          ELSE NULL
        END ASC;
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

const getActivitiesByVolID = async (volunteer_id, activity_status) => {
  const client = await pool.connect();
  try {
    const queryText = `
      SELECT * FROM get_activities_for_volunteer($1, $2)
    `;
    const params = [volunteer_id, activity_status];
    const { rows } = await client.query(queryText, params);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const applyActivityForVol = async (email, activity_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Validate if the activity exists and has available participants
    const checkActivityQuery = `
      SELECT available_participants
      FROM activities
      WHERE activity_id = $1
    `;
    const checkActivityResult = await client.query(checkActivityQuery, [
      activity_id,
    ]);
    const availableParticipants =
      checkActivityResult.rows[0]?.available_participants;

    if (availableParticipants === undefined) {
      throw new Error(`Activity with ID ${activity_id} does not exist.`);
    }

    if (availableParticipants <= 0) {
      throw new Error("No available participants left.");
    }

    // Call the procedure to handle the application
    const applyQueryText = `
      CALL apply_volunteer_activity($1, $2)
    `;
    const params = [email, activity_id];
    await client.query(applyQueryText, params);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error applying for activity:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const cancelActivityForVol = async (volunteer_id, activity_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const validateQuery = `
      SELECT
          CASE
              WHEN activity_start_date - INTERVAL '2 days' <= CURRENT_TIMESTAMP THEN FALSE
              ELSE TRUE
          END AS can_cancel
      FROM activities
      WHERE activity_id = $1
    `;
    const { rows: checkRows } = await client.query(validateQuery, [
      activity_id,
    ]);

    if (checkRows.length === 0) {
      throw new Error(`Activity with ID ${activity_id} does not exist.`);
    }

    const canCancel = checkRows[0].can_cancel;

    if (!canCancel) {
      throw new Error(
        "Cannot cancel activity within 48 hours of the start time."
      );
    }

    const cancelQueryText = `
      CALL public.volunteer_cancels_activity($1, $2)
    `;
    await client.query(cancelQueryText, [volunteer_id, activity_id]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error cancelling activity for volunteer:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const cancelActivityForOrg = async (org_id, activity_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check if the activity exists and if it can be cancelled
    const validateQuery = `
      SELECT activity_approval_status, activity_status, activity_start_date,
             CASE
               WHEN activity_start_date - INTERVAL '2 days' <= CURRENT_TIMESTAMP THEN FALSE
               ELSE TRUE
             END AS can_cancel
      FROM activities
      WHERE activity_id = $1 AND org_id = $2
    `;
    const { rows: checkRows } = await client.query(validateQuery, [
      activity_id,
      org_id,
    ]);

    if (checkRows.length === 0) {
      throw new Error(`Activity with ID ${activity_id} does not exist.`);
    }

    const { activity_approval_status, activity_status, can_cancel } =
      checkRows[0];

    if (!can_cancel) {
      throw new Error(
        "Cannot cancel activity within 48 hours of the start time."
      );
    }

    if (activity_approval_status === "Pending") {
      // If the activity is pending, mark it as cancelled
      const cancelQueryText = `
        UPDATE activities
        SET activity_status = 'Cancelled'
        WHERE activity_id = $1 AND org_id = $2
      `;
      await client.query(cancelQueryText, [activity_id, org_id]);
    } else {
      // If the activity is not pending, perform the cancellation logic
      const cancelQueryText = `
        CALL cancel_org_activity($1)
      `;
      await client.query(cancelQueryText, [activity_id]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error cancelling activity for organisation:", error.message);
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
      INSERT INTO activities (
        org_id,
        activity_name,
        activity_description,
        activity_start_date,
        activity_end_date,
        activity_deadline,
        max_participants,
        min_participants,
        available_participants,
        activity_status,
        activity_location,
        activity_image,
        activity_approval_status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const params = [
      activity.org_id,
      activity.activity_name,
      activity.activity_description,
      activity.activity_start_date,
      activity.activity_end_date,
      activity.activity_deadline,
      activity.max_participants,
      activity.min_participants,
      activity.available_participants,
      activity.activity_status,
      activity.activity_location,
      activity.activity_image,
      activity.activity_approval_status,
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

const getPendingActivites = async () => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_all_activity_details_by_pending_approval()
    `;
    const { rows } = await client.query(queryText);

    return rows;
  } catch (error) {
    console.error("Error fetching pending activities:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const updateActivityApprovalStatus = async (activity_id, approval_status) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const queryText = `
      call update_approval_status($1, $2)
    `;
    const params = [activity_id, approval_status];
    await client.query(queryText, params);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating activity approval status:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const getActivityByID = async (activity_id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM activities WHERE activity_id = $1
    `;
    const params = [activity_id];
    const { rows } = await client.query(queryText, params);

    return rows[0]?.activity_name;
  } catch (error) {
    console.error("Error fetching activity name by ID:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const getOrganisationEmailByID = async (org_id) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT u.email FROM users u JOIN organisations o ON u.user_id = o.user_id WHERE o.org_id = $1
    `;
    const params = [org_id];
    const { rows } = await client.query(queryText, params);

    return rows[0]?.org_email;
  } catch (error) {
    console.error("Error fetching organisation email by ID:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getNonAppliedActivityByID,
  getNonCreatedActivityByID,
  getAllActivities,
  getActivitiesByVolID,
  createActivity,
  applyActivityForVol,
  getActivitiesByOrgID,
  cancelActivityForOrg,
  cancelActivityForVol,
  getPendingActivites,
  updateActivityApprovalStatus,
  getOrganisationEmailByID,
  getActivityByID,
};
