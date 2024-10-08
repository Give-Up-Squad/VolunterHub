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

const updateGardaVettingStatus = async () => {
  const client = await pool.connect();
  try {
    const updateGardaVettingStatusQuery = `
        CALL garda_vetting_verification()
    `;
    const response = await client.query(updateGardaVettingStatusQuery);
    console.log(`${response.rowCount} garda vetting status updated.`);
  } catch (error) {
    console.error("Error updating status:", error.message);
  } finally {
    client.release();
  }
};

updateGardaVettingStatus();
