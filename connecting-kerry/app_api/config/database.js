require("dotenv").config();
const fs = require("fs");
const { Pool } = require("pg");

const config = {
  user: "avnadmin",
  password: process.env.DB_PASSWORD,
  host: "connectingkerry-connecting-kerry.l.aivencloud.com",
  port: 23109,
  database: "connecting-kerry",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.DB_CERT).toString(),
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

module.exports = { pool };
