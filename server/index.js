const express = require("express");
const pool = require("./db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM employee";
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, dept, password } = req.body;

    console.log(email, dept, password);

    // Assuming you have a table named 'employees' with columns 'empname', 'empdept', and 'password'
    const query = {
      text: "SELECT * FROM users WHERE email = $1 AND password = $2 AND dept = $3",
      values: [email, password, dept],
    };

    const result = await pool.query(query);

    console.log(result);

    if (result.rows.length > 0) {
      // Employee with the provided empname and password found
      const { empdept } = result.rows[0];
      res
        .status(200)
        .json({ success: true, message: "Login successful", empdept });
    } else {
      // No matching employee found
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/applyleave", async (req, res) => {
  try {
    const { bossmail, mail, body } = req.body;
  } catch (error) {}
});

app.post("/api/register", async (req, res) => {
  try {
    const { id, email, name, password, dept } = req.body;

    const query = {
      text: "INSERT INTO users(id , name, email , password, dept) VALUES ($1, $2, $3, $4 , $5) RETURNING id",
      values: [id, email, name, password, dept],
    };

    const result = await pool.query(query);

    // Assuming your 'employees' table has an 'id' column that is auto-incremented
    const insertedId = result.rows[0].id;

    res
      .status(201)
      .json({ success: true, message: "Signup successful", insertedId });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/:empid", async (req, res) => {
  try {
    const { empid } = req.params;
    const { empname, department, gender, dob, designation, empsalary } =
      req.body;
    // console.log(req.body, studentid);

    const sql =
      "UPDATE employee SET empname= $1, department = $2 , dob = $3 , gender = $4 , empsalary = $5 , designation = $6 WHERE empid = $7";
    const values = [
      empname,
      department,
      dob,
      gender,
      empsalary,
      designation,
      empid,
    ];

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
    const { empid, empname, department, gender, dob, designation, empsalary } =
      req.body;
    const sql =
      "INSERT INTO employee ( empid , empname, department , gender , dob , designation , empsalary ) VALUES ($1, $2, $3 , $4 , $5 , $6 , $7)";
    const values = [
      empid,
      empname,
      department,
      gender,
      dob,
      designation,
      empsalary,
    ];

    await pool.query(sql, values);
    console.log("Created");
    res.status(200).send("Data inserted successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Error occurred while inserting data: ${err.message}`);
  }
});

app.delete("/:empid", async (req, res) => {
  try {
    const { empid } = req.params;
    const sql = "DELETE FROM employee WHERE empid = $1";
    await pool.query(sql, [empid]);
    console.log("Deleted");
    res.status(200).send("Data deleted successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Error occurred while deleting data: ${err.message}`);
  }
});

app.post("/api/authentication", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const sql =
      "SELECT * FROM admin WHERE name = $1 AND email = $2 AND password = $3";
    const values = [name, email, password];
    const response = await pool.query(sql, values);

    if (response.rows.length > 0) {
      res.status(200).send("Login Successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send(`Error occurred while Authentication of admin ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
