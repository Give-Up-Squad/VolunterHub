const pool = require("../config/database");

const createVolunteer = async (userId, gender, dob, forename, surname) => {
  const result = await pool.query(
    "SELECT insert_volunteer_details($1, $2, $3, $4, $5)",
    [userId, gender, dob, forename, surname]
  );
  return result.rows[0];
};

module.exports = { createVolunteer };
