import React, { useEffect, useState } from "react";
import Tableinput from "./Tableinput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles.css";

export default function Mainpage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [studentname, setStudentname] = useState("");
  const [studentid, setStudentid] = useState();
  const [studentreg, setStudentreg] = useState();
  const [studentcgpa, setStudentcgpa] = useState();
  function checking(str) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str) ;
  }

  const handleSubmit = async (e) => {
    if (studentname.length < 3 || checking(studentname) === false) {
      alert(
        "Your name has a length less than expected or with any other character other than letters"
      );
      return;
    }

    const curreg = studentreg.toString();
    if (!curreg.startsWith("2104") || curreg.length < 7) {
      alert("Incorrect registration number");
      return;
    }

    const curmarks = parseFloat(studentcgpa);
    if (curmarks > 100 || isNaN(curmarks)) {
      alert("Error with mark insertion");
      return;
    }

    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_ROUTE, {
        studentid: studentid,
        studentreg: studentreg,
        studentcgpa: studentcgpa,
        studentname: studentname,
      });

      if (response) {
        console.log(`data successfully posted ${response}`);
      }
    } catch (err) {
      console.log(`error in mainpage ${err.message}`);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_ROUTE)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });

  const handleDelete = (studentid) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_ROUTE}${studentid}`)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Student Details</h1>
            <div className="inputs">
              <div classname="inputs">
                <input
                  type="text"
                  placeholder="Enter Name:"
                  onChange={(e) => setStudentname(e.target.value)}
                />
              </div>
            </div>
            <div className="inputs">
              <div classname="inputs">
                <input
                  type="number"
                  placeholder="Enter RegisteredNumber:"
                  onChange={(e) => setStudentreg(e.target.value)}
                />
              </div>
            </div>
            <div className="inputs">
              <div classname="inputs">
                <input
                  type="number"
                  placeholder="Enter Marks:"
                  onChange={(e) => setStudentcgpa(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
        <div className="container">
          <div className="main">
            <table className="table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <div></div>
                  <th>Student Name</th>
                  <div></div>
                  <th>Student Register Number</th>
                  <div></div>
                  <th>Student Marks</th>
                  <div></div>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr>
                    <td>{d.studentid}</td>
                    <div></div>
                    <td>{d.studentname}</td>
                    <div></div>
                    <td>{d.studentreg}</td>
                    <div></div>
                    <td>{d.studentcgpa}</td>
                    <div></div>
                    <td>
                      <button
                        className="btn-del"
                        onClick={(e) => handleDelete(d.studentid)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Tableinput student={d} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
