import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Modifydatase(props) {
  const location = useLocation();
  const employeeData = location.state.employee;

  const navigate = useNavigate();

  console.log(employeeData);

  const [empid, setEmpid] = useState(employeeData.empid || 0);
  const [empname, setempname] = useState(employeeData.empname || "");
  const [email, setemail] = useState(employeeData.email || "");
  const [department, setEmpDepartment] = useState(
    employeeData.department || ""
  );
  const [dob, setdob] = useState(employeeData.dob || "");
  const [gender, setgender] = useState(employeeData.gender || "");
  const [designation, setdesignation] = useState(
    employeeData.designation || ""
  );
  const [empsalary, setempsalary] = useState(employeeData.empsalary || "");

  function checking(str) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
  }

  const handleSubmit = async (e) => {
    if (empname.length > 30 || checking(empname) === false) {
      alert(
        "Employee name should have a length lesser than 30 and contain only letters."
      );
      return;
    }

    const curReg = empid.toString();

    if (curReg.length < 2) {
      alert("Incorrect employee registration number");
      return;
    }
    const cursalary = empsalary.toString();

    if (cursalary.length > 8) {
      alert("you have salary more than length 8");
    }

    // Validate other fields as needed

    e.preventDefault();

    try {
      const response = await axios.put(
        `https://studentdetails-backend.onrender.com/${empid}`,
        {
          empname,
          dob,
          gender,
          empsalary,
          department,
          designation,
        }
      );

      if (response) {
        console.log(`Data entered successfully ${response.data}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-center text-3xl font-semibold mt-5">Modify Data</h1>
      <form className="mt-8 p-5">
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={empname}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            onChange={(e) => setempname(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            for="id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Employee ID
          </label>
          <input
            type="number"
            id="cid"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            for="department"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <select
            id="department"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setEmpDepartment(e.target.value)}
            value={department}
          >
            <option selected>Choose a Department</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Service">Service</option>
            <option value="Tester">Tester</option>
          </select>
        </div>

        <div>
          <label
            for="date"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            DOB
          </label>
          <input
            type="date"
            id="dob"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setdob(e.target.value)}
            value={dob}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div class="flex items-center mb-4">
          <input
            id="default-radio-1"
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={() => setgender("Male")}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-1"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Male
          </label>
        </div>
        <div class="flex items-center">
          <input
            checked
            id="default-radio-2"
            type="radio"
            value="Female"
            name="gender"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={gender === "Female"}
            onChange={() => setgender("Female")}
          />
          <label
            for="default-radio-2"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Female
          </label>
        </div>
        <div className="p-5">
          <div className="mb-6">
            <label
              htmlFor="designation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Designation
            </label>
            <select
              id="designation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={designation}
              onChange={(e) => setdesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="E">Engineering</option>
              <option value="Engineering">Engineering</option>
              <option value="Arts">Engineering</option>
              <option value="Science">Engineering</option>
              <option value="10th">Engineering</option>
              <option value="12th">Engineering</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div class="mb-6">
          <label
            for="salary"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={empsalary}
            onChange={(e) => setempsalary(e.target.value)}
            placeholder="10,1000"
            required
          />
        </div>
      </form>

      <div className="flex justify-end mr-5">
        <Button
          type="button"
          className="bg-red-500"
          onClick={(e) => handleSubmit(e)}
        >
          Edit
        </Button>
        <Button
          type="button"
          className="bg-blue-500"
          onClick={() => navigate("../user")}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
