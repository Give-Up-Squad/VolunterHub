const { pool } = require("../config/database");

const createUser = async (
  username,
  email,
  is_garda_vetted,
  roles,
  dob,
  forename,
  surname,
  org_name
) => {
  const client = await pool.connect(); // Retrieve a client from the pool

  try {
    console.log("Creating user with the following details:", {
      username,
      email,
      is_garda_vetted,
      roles,
      dob,
      forename,
      surname,
      org_name,
    });
    await client.query("BEGIN");
    const queryText =
      "CALL insert_user_details($1, $2, $3, $4, $5, $6, $7, $8)";
    const params = [
      username,
      email,
      is_garda_vetted,
      roles,
      dob,
      forename,
      surname,
      org_name,
    ];

    const { rows } = await client.query(queryText, params); // Execute the query using client.query

    await client.query("COMMIT");
    console.log("Result from database:", rows);
    return rows && rows[0]; // Assuming the stored procedure returns a row
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error executing insert_user_details stored procedure:",
      error
    );
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

const getUserByEmail = async (email) => {
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

const getAllUsers = async () => {
  const client = await pool.connect();

  try {
    const queryText = `SELECT u.*, v.volunteer_id, v.dob, v.forename, v.surname, o.org_id, o.org_name from users u LEFT JOIN volunteers v ON u.user_id = v.user_id LEFT JOIN organisations o ON o.user_id = u.user_id`;
    const { rows } = await client.query(queryText);

    return rows;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createUser, getUserByEmail, getAllUsers };
