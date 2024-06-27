const pool = require("../config/database");

const createOrganisation = async (userId, orgName) => {
  const result = await pool.query(
    "SELECT insert_organisation_details($1, $2)",
    [userId, orgName]
  );
  return result.rows[0];
};

module.exports = { createOrganisation };
