const { pool } = require("../config/database");
const { format } = require("date-fns"); // Install date-fns using npm install date-fns

const updateActivityStatus = async () => {
  const client = await pool.connect();
  try {
    const now = new Date();
    const formattedNow = format(now, "yyyy-MM-dd HH:mm:ss");

    const updateToOngoingQuery = `
      UPDATE activities
      SET activity_status = 'Ongoing'
      WHERE activity_start_date <= $1
    `;
    const resOngoing = await client.query(updateToOngoingQuery, [formattedNow]);
    console.log(`${resOngoing.rowCount} activities updated to Ongoing.`);

    const updateToEndedQuery = `
      UPDATE activities
      SET activity_status = 'Ended'
      WHERE activity_end_date <= $1
    `;
    const resEnded = await client.query(updateToEndedQuery, [formattedNow]);
    console.log(`${resEnded.rowCount} activities updated to Ended.`);
  } catch (error) {
    console.error("Error updating activities:", error.message);
  } finally {
    client.release();
  }
};

updateActivityStatus();
