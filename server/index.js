const express = require("express");
const pool = require("./db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM stutab";
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/:studentid", async (req, res) => {
  try {
    const { studentid } = req.params;
    const { studentname, studentreg, studentcgpa } = req.body;
    console.log(req.body, studentid);

    const sql =
      "UPDATE stutab SET studentname = $1, studentreg = $2, studentcgpa = $3 WHERE studentid = $4";
    const values = [studentname, studentreg, studentcgpa, studentid];

    await pool.query(sql, values);
    console.log("Updated");
    res.status(200).send("Data Updated successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Error occurred while updating data: ${err.message}`);
  }
});

app.post("/", async (req, res) => {
  try {
    const { studentname, studentcgpa, studentreg } = req.body;
    const sql =
      "INSERT INTO stutab (studentname, studentcgpa, studentreg) VALUES ($1, $2, $3)";
    const values = [studentname, studentcgpa, studentreg];

    await pool.query(sql, values);
    console.log("Created");
    res.status(200).send("Data inserted successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Error occurred while inserting data: ${err.message}`);
  }
});

app.delete("/:studentid", async (req, res) => {
  try {
    const { studentid } = req.params;
    const sql = "DELETE FROM stutab WHERE studentid = $1";

    await pool.query(sql, [studentid]);
    console.log("Deleted");
    res.status(200).send("Data deleted successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Error occurred while deleting data: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
