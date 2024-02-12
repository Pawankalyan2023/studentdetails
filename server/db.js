const Pool = require("pg").Pool;
require("dotenv").config();


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});




pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected successfully with the db');
    release();
  });
  

module.exports = pool;