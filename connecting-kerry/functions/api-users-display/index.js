const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../app_api/.env.backend"),
});

const { pool } = require("../../app_api/config/database");

const getUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const queryText = `SELECT * FROM get_user_data_by_email($1)`;
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

exports.handler = async (event, context) => {
  const email = event.path.split("/").pop();
  // console.log(event);
  // console.log(email);

  try {
    const user = await getUserByEmail(email);

    if (!user || user.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
    };
  } catch (error) {
    console.error("Error fetching user data:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch user data" }),
    };
  }
};
