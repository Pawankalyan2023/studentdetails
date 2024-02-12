import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Tableinput({ student }) {
  const navigate = useNavigate();

  const studentid = student.studentid || 0;
  const [studentname, setStudentname] = useState(student.studentname || "");
  const [studentreg, setStudentreg] = useState(student.studentreg || 0);
  const [studentcgpa, setStudentcgpa] = useState(student.studentcgpa || "");

  function checking(str) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
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
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_ROUTE}${studentid}`,
        {
          studentid: studentid,
          studentname: studentname,
          studentreg: studentreg,
          studentcgpa: studentcgpa,
        }
      );

      if (response) {
        console.log(`data entered successful ${response.data}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${studentid}`}
      >
        Edit
      </button>
      <div className="modal" id={`id${studentid}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Details</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={studentname}
                placeholder="Enter new Student name"
                onChange={(e) => setStudentname(e.target.value)}
              />
            </div>

            <div className="modal-body">
              <input
                type="number"
                className="form-control"
                placeholder="Enter new Register Number"
                value={studentreg}
                onChange={(e) => setStudentreg(e.target.value)}
              />
            </div>

            <div className="modal-body">
              <input
                type="number"
                className="form-control"
                placeholder="Enter new CGPA"
                value={studentcgpa}
                onChange={(e) => setStudentcgpa(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => handleSubmit(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => navigate("./")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
