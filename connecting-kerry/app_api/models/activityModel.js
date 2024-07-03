const { pool } = require("../config/database");

const getAllActivities = async (email) => {
  const client = await pool.connect();

  try {
    const queryText = `
      SELECT * FROM get_user_data_by_email($1)
    `;
    const params = [email];
    const { rows } = await client.query(queryText, params);

    return rows;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  } finally {
    client.release();
  }
};
