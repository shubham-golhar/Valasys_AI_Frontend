// Dashboard.js

import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Reports</li>
          <li>Analytics</li>
          {/* Add more sidebar items as needed */}
        </ul>
      </aside>
      <main className="main-content">
        <h1>Welcome to the Dashboard!</h1>
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;
