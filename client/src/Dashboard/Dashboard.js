import { useEffect, useState } from "react";
import PieChart from "./Piechart";
import axios from "axios";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [record, setRecord] = useState([]);

  const totalSize = record.reduce(
    (acc, current) => acc + Object.keys(current).length,
    0
  );

  // Calculate department-wise statistics
  const departmentStats = record.reduce((stats, current) => {
    const department = current.department || "Unknown";
    stats[department] = (stats[department] || 0) + 1;
    return stats;
  }, {});

  // Calculate designation-wise statistics
  const designationStats = record.reduce((stats, current) => {
    const designation = current.designation || "Unknown";
    stats[designation] = (stats[designation] || 0) + 1;
    return stats;
  }, {});

  // Calculate active and inactive employee count
  const activeEmployeeCount = record.filter(
    (employee) => employee.isActive
  ).length;
  const inactiveEmployeeCount = record.length - activeEmployeeCount;

  // Extracting data from the first object in the array
  const firstRecord = record.length > 0 ? record[0] : {};

  const totalDepartments = Object.keys(departmentStats).length;

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_ROUTE}/`)
      .then((response) => setRecord(response.data))
      // .then((data) => setRecord(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(`clg in dashboard ${record}`);

  const downloadExcel = (record) => {
    console.log(record);
    const worksheet = XLSX.utils.json_to_sheet(record);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <div class="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">Employees</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <p class="lead d-none d-sm-block">Employee Details and Records</p>
      <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span class="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>
      <div class="row mb-3">
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div
              class="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Employee users</h6>
              <h1 class="display-4">{totalSize}</h1>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <i class="fa fa-list fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Total Departments</h6>
              <h1 class="display-4">{totalDepartments}</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-info h-100">
            <div class="card-body bg-info">
              <div class="rotate">
                <i class="fab fa-twitter fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Active Employees</h6>
              <h1 class="display-4">{activeEmployeeCount > 0 || 5}</h1>
            </div>
          </div>
        </div>
        <button
          class="col-xl-3 col-sm-6 py-2 px-10"
          onClick={() => downloadExcel(record)}
        >
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-warning h-100">
              <div class="card-body">
                <div class="rotate">
                  <i class="fa fa-share fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Download File</h6>
              </div>
            </div>
          </div>
        </button>
      </div>
      <hr />

      <div class="row ">
        <div class="col-lg-7 col-md-6 col-sm-12">
          <h5 class="mt-3 mb-3 text-secondary">
            Check More Records of Employees
          </h5>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead class="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Designation</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {record.map((output) => (
                  <tr>
                    <td>{output.empid}</td>
                    <td>{output.empname}</td>
                    <td>{output.dob}</td>
                    <td>{output.gender}</td>
                    <td>{output.designation}</td>
                    <td>{output.empsalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
          <h4 className="title mt-3 mb-3 text-center text-secondary text-2xl">
            Data in Chart
          </h4>
          <div
            className="mb-5 ml-5"
            style={{ height: "300px", width: "400px" }}
          >
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
