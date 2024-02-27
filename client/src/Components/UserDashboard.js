import React, { useEffect, useState } from "react";
import axios from "axios";
// import Tableinput from "./Tableinput";
import { useNavigate } from "react-router-dom";
// import Intputmodel from "./Modaledit";
import Admindash from "./Admin";
import { Button } from "flowbite-react";

export default function EmployeeDetails() {
  const navigate = useNavigate();

  const [empname, setEmpName] = useState("");
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [empid, setEmpId] = useState();
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [designation, setDesignation] = useState("");
  const [empsalary, setSalary] = useState("");

  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    console.log(
      empid,
      empname,
      department,
      dob,
      gender,
      designation,
      empsalary
    );

    e.preventDefault();
    try {
      if (
        empid === "" ||
        empname === "" ||
        department === "" ||
        dob === "" ||
        gender === "" ||
        designation === "" ||
        empsalary === 0
      ) {
        alert("Please fill all the fields");
        return;
      }

      if (isNaN(empid) || empid <= 0) {
        alert("Employee ID must be a positive number");
        return;
      }

      if (!/^[a-zA-Z\s]*$/.test(empname)) {
        alert("Employee Name should only contain letters and spaces");
        return;
      }

      if (
        department !== "IT" &&
        department !== "HR" &&
        department !== "Finance"
      ) {
        alert("Invalid department. Please select a valid department.");
        return;
      }

      // Validate date of birth
      const currentDate = new Date();
      const selectedDate = new Date(dob);

      if (selectedDate > currentDate) {
        alert("Date of Birth cannot be in the future");
        return;
      }

      if (gender !== "Male" && gender !== "Female") {
        alert("Invalid gender. Please select Male or Female.");
        return;
      }

      if (designation.length > 50) {
        alert("Designation must be within 50 characters");
        return;
      }

      if (isNaN(empsalary) || empsalary <= 0) {
        alert("Employee Salary must be a positive number");
        return;
      }

      const response = await axios.post(process.env.REACT_APP_BACKEND_ROUTE, {
        empid: empid,
        empname: empname,
        department: department,
        dob: dob,
        gender: gender,
        designation: designation,
        empsalary: empsalary,
      });

      if (response) {
        console.log(`Data successfully posted ${response}`);
        alert("Successfully data added to the backend");
      }
    } catch (err) {
      console.log(`Error in mainpage ${err.message}`);
    }
  };
  // console.log(`${process.env.REACT_APP_BACKEND_ROUTE}?page=${currentPage}`);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROUTE}?page=${currentPage}`
      );

      console.log(response.data);
      setOriginalEmployees(response.data);
      setEmployees(response.data); // both original and current employees are set to the same data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (employee) => {
    navigate("/modify", { state: { employee: employee } });
    console.log(employee.id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = originalEmployees.filter((employee) => {
      return (
        employee.empname.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase()) ||
        employee.designation.toLowerCase().includes(search.toLowerCase())
      );
    });

    setEmployees(filteredData); // Move this line inside the function body
  };

  useEffect(() => {
    // Use fetchData here
    fetchData();
  }, [currentPage]);

  const handleRemoveSearch = () => {
    setSearch("");
    setEmployees(originalEmployees); // reset employees to the original data
  };

  const handleapplyleave = (employee) => {
    navigate("/apply", { state: { employee } });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = 10;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlelogout = () => {
    navigate("/");
  };

  const handleDelete = async (empid) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_ROUTE}/${empid}`; // Ensure there's a slash between route and empid
      console.log("Delete URL:", url);

      const response = await axios.delete(url);

      // Check if the delete request was successful
      if (response.status === 200) {
        console.log(`Employee with ID ${empid} deleted successfully`);
        fetchData(); // Fetch updated data after deletion
      } else {
        console.error(`Error deleting employee with ID ${empid}`);
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  return (
    <div className="m-10">
      <div>
        <div className="flex flex-row justify-evenly">
          <Button className="bg-red-500" onClick={handlelogout}>
            Logout
          </Button>
          <Button
            className="bg-orange-500"
            onClick={(e) => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </div>
        <h1 className="mt-5 text-center text-2xl">Register New Employee</h1>
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              onChange={(e) => setEmpName(e.target.value)}
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
              onChange={(e) => setEmpId(e.target.value)}
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
              onChange={(e) => setDepartment(e.target.value)}
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
              onChange={(e) => setDob(e.target.value)}
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
              onChange={() => setGender("Male")}
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
              onChange={() => setGender("Female")}
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
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="">Select Designation</option>
                <option value="Experienced">Experienced</option>
                <option value="Engineering">Engineering</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
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
              onChange={(e) => setSalary(e.target.value)}
              placeholder="10,1000"
              required
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="m-10">
        <h2 className="text-center text-3xl mb-5">
          Search the employee details
        </h2>
        <form className="m-5" onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Employee Name, Department, or Designation"
              required
            />
            <div className="flex absolute inset-y-0 end-2.5 items-center">
              {search && (
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={handleRemoveSearch}
                >
                  Clear Search
                </button>
              )}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Employee ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of Birth
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Apply Leave
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {employee.empid}
                  </th>
                  <td className="px-6 py-4">{employee.empname}</td>
                  {/* <td className="px-6 py-4">{employee.empid}</td> */}
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">
                    {new Date(employee.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{employee.gender}</td>
                  <td className="px-6 py-4">{employee.designation}</td>
                  <td className="px-6 py-4">{employee.empsalary}</td>
                  <td>
                    <button
                      className="btn-del  text-blue-500"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="btn-del  text-red-500"
                      onClick={() => handleDelete(employee.empid)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="btn-del text-red-500"
                      onClick={() => handleapplyleave(employee.empid)}
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {employees.length}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={handlePreviousPage}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              <li>
                <button
                  onClick={handleNextPage}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
