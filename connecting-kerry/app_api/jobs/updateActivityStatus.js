const { format } = require("date-fns"); // Install date-fns using npm install date-fns
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.backend") });
const fs = require("fs");
const { Pool } = require("pg");

const cert = process.argv[2];
const pwd = process.argv[3];

const certPath = path.resolve(__dirname, "../", cert);

// Debugging: Print the resolved path and check if the file exists
// console.log("DB_CERT environment variable:", process.env.DB_CERT);
// console.log("Resolved DB_CERT path:", certPath);

if (!fs.existsSync(certPath)) {
  console.error("Certificate file not found at path:", certPath);
  process.exit(1);
}

const config = {
  user: "avnadmin",
  password: pwd,
  host: "connectingkerry-connecting-kerry.l.aivencloud.com",
  port: 23109,
  database: "connecting-kerry",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(certPath).toString(),
  },
};

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); // Optional: handle idle client errors
});

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
