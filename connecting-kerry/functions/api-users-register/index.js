const { pool } = require("../../app_api/config/database");

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
  const client = await pool.connect();
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
    const { rows } = await client.query(queryText, params);
    await client.query("COMMIT");
    console.log("Result from database:", rows);
    return rows && rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error executing insert_user_details stored procedure:",
      error
    );
    throw error;
  } finally {
    client.release();
  }
};

exports.handler = async (event, context) => {
  const {
    username,
    email,
    is_garda_vetted,
    roles,
    dob,
    forename,
    surname,
    org_name,
  } = JSON.parse(event.body);

  try {
    const user = await createUser(
      username,
      email,
      is_garda_vetted,
      roles,
      dob,
      forename,
      surname,
      org_name
    );
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User registered successfully", user }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
