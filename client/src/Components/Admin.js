import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function  Admindash  ()  {
  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = async () => {
    if (
      username === "" ||
      id === 0 ||
      email === "" ||
      dept === "" ||
      designation === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    // Validate other fields as needed

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKROOT}/api/addbook`,
        {
          username,
          id,
          email,
          dept,
          designation,
        }
      );

      if (response) {
        alert("Data Added Successfully");
        Navigate("/adminmain");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-center text-3xl font-semibold mt-5">Modify Data</h1>
      <div className="">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 mb-5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID
          </label>
          <input
            type="number"
            id="id"
            onChange={(e) => setId(e.target.value)}
            value={id}
            className="bg-gray-50 border border-gray-300 mb-5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="dept"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <input
            type="text"
            id="dept"
            onChange={(e) => setDept(e.target.value)}
            value={dept}
            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="IT"
            required
          />
        </div>
        <div>
          <label
            htmlFor="designation"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Designation
          </label>
          <input
            type="text"
            id="designation"
            onChange={(e) => setDesignation(e.target.value)}
            value={designation}
            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Software Engineer"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};


