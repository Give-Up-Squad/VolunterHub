const { pool } = require("../config/database");

const createUser = async (username, email, password, isGardaVetted, roles) => {
  const client = await pool.connect(); // Retrieve a client from the pool

  try {
    console.log("Creating user with the following details:", {
      username,
      email,
      password,
      isGardaVetted,
      roles,
    });

    const queryText = "CALL insert_user_details($1, $2, $3, $4, $5)";
    const params = [username, email, password, isGardaVetted, roles];

    const { rows } = await client.query(queryText, params); // Execute the query using client.query

    console.log("Result from database:", rows);
    return rows && rows[0]; // Assuming the stored procedure returns a row
  } catch (error) {
    console.error(
      "Error executing insert_user_details stored procedure:",
      error
    );
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

const getUserByEmail = async (email) => (module.exports = { createUser });
