import React, { useState } from "react";
// Import icon libs, tables, PrimeReact or shadcn/ui components here
import { FaUsers, FaAd, FaMoneyBillWave, FaCheck } from "react-icons/fa";
import "./Dashboard.css"; // Already present in your repo


{/* // Dummy Users & Ads Data (simulate backend) */}
const users = [
    { id: 1, name: "Alice", date: "2024-07-01", status: "active" },
    { id: 2, name: "Bob", date: "2024-06-20", status: "blocked" }
  ];
  const ads = [
    { id: 191, title: "iPhone 13", category: "Electronics", price: 65000, status: "active" },
    { id: 273, title: "Mountain Bike", category: "Sports", price: 15000, status: "pending" }
  ];


function AdminPannel() {
    const [activeTab, setActiveTab] = useState("users");
    // Add more mock stats if needed
    const stats = [
      { label: "Total Users", value: users.length, icon: <FaUsers />, bg: "bg-blue-100" },
      { label: "Total Ads", value: ads.length, icon: <FaAd />, bg: "bg-green-100" },
      { label: "Revenue", value: "₹10,50,000", icon: <FaMoneyBillWave />, bg: "bg-yellow-100" },
      { label: "Active Ads", value: ads.filter(ad => ad.status === "active").length, icon: <FaCheck />, bg: "bg-teal-100" }
    ];
  return (
    <>

           {/* <!-- Admin Panel --> */}
           {/* <div className="page" id="adminPage">
            <div className="container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                </div>
                
                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-info">
                            <h3 id="totalUsers">1,234</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-ad"></i>
                        </div>
                        <div className="stat-info">
                            <h3 id="totalAds">5,678</h3>
                            <p>Total Ads</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-info">
                            <h3 id="totalRevenue">$12,345</h3>
                            <p>Revenue</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-info">
                            <h3 id="activeAds">987</h3>
                            <p>Active Ads</p>
                        </div>
                    </div>
                </div>
                
                <div className="admin-tabs">
                    <button className="admin-tab active" data-tab="users">Users</button>
                    <button className="admin-tab" data-tab="ads">Ads</button>
                    <button className="admin-tab" data-tab="reports">Reports</button>
                </div>
                
                <div className="admin-content">
                    {/* <!-- Users Management --> 
                    <div className="admin-panel" id="usersPanel">
                        <div className="panel-header">
                            <h2>User Management</h2>
                            <input type="text" placeholder="Search users..." className="form-control search-input" id="userSearch"/>
                        </div>
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Join Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* <!-- Ads Management --> 
                    <div className="admin-panel hidden" id="adsPanel">
                        <div className="panel-header">
                            <h2>Ad Management</h2>
                            <input type="text" placeholder="Search ads..." className="form-control search-input" id="adSearch"/>
                        </div>
                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="adsTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* <!-- Reports Panel --> 
                    <div className="admin-panel hidden" id="reportsPanel">
                        <div className="panel-header">
                            <h2>Reports & Analytics</h2>
                        </div>
                        <div className="reports-grid">
                            <div className="report-card">
                                <h3>User Growth</h3>
                                <div className="chart-placeholder">
                                    <i className="fas fa-chart-line"></i>
                                    <p>Chart visualization would go here</p>
                                </div>
                            </div>
                            <div className="report-card">
                                <h3>Ad Categories</h3>
                                <div className="chart-placeholder">
                                    <i className="fas fa-chart-pie"></i>
                                    <p>Pie chart would go here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}

    <div className="admin-panel mx-2">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card flex items-center gap-4">
            <div className={`stat-icon ${stat.bg}`}>{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab${activeTab === "users" ? " active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`admin-tab${activeTab === "ads" ? " active" : ""}`}
          onClick={() => setActiveTab("ads")}
        >
          Ads
        </button>
        {/* Add more tabs as needed, e.g. Reports, Analytics */}
      </div>

      <div className="admin-panel">
        {activeTab === "users" && (
          <div className="data-table">
            <h4>Users</h4>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.date}</td>
                    <td>
                      <span className={`status status--${u.status === "active" ? "success" : "error"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">Block</button>
                      <button className="action-btn danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="data-table">
            <h4>Ads</h4>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad.id}>
                    <td>{ad.id}</td>
                    <td>{ad.title}</td>
                    <td>{ad.category}</td>
                    <td>₹{ad.price}</td>
                    <td>
                      <span className={`status status--${ad.status === "active" ? "success" : "warning"}`}>
                        {ad.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">Approve</button>
                      <button className="action-btn danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Chart/analytics placeholders */}
      <div className="reports-grid mt-16">
        <div className="report-card">
          <h3>Ads by Category</h3>
          <div className="chart-placeholder">[Chart visualization goes here]</div>
        </div>
        <div className="report-card">
          <h3>User Breakdown</h3>
          <div className="chart-placeholder">[Pie chart goes here]</div>
        </div>
      </div>
    </div>

    </>
  )
}

export default AdminPannel