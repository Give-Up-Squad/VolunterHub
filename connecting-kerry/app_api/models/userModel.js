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

const getUserByEmail = async (email) => {};

module.exports = { createUser };
