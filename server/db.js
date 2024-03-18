const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
    user: "postgres",
    password: "DbXUerGAspGNKkRvHzKYsRjIPPlZzbRp",
    host: "viaduct.proxy.rlwy.net",
    port: "29286",
    database: "railway",
});


// const pool = new Pool({
//   connectionLimit: process.env.AWS_CONNECTIONLIMIT,
//   user: process.env.AWS_USER,
//   host: process.env.AWS_HOST,
//   database: process.env.AWS_DATABASE,
//   password: process.env.AWS_PASSWORD,
//   port: process.env.AWS_PORT,
// });

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected successfully with the db");
  release();
});

module.exports = pool;
