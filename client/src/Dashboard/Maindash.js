import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Slidebar from "./Slidebar";

export default function MainDash() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Slidebar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
