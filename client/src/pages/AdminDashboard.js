import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="container-fluid py-2 bg-dark">
        <div className="d-flex justify-content-between align-items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="btn btn-outline-light btn-sm d-lg-none"
          >
            ☰ Menu
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-outline-light btn-sm">
            ← Back
          </button>
        </div>
      </div>
      <div className="d-flex position-relative" style={{ minHeight: '100vh' }}>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark d-lg-none" 
          style={{opacity: 0.5, zIndex: 999}}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Navigation - Responsive */}
      <div 
        className={`bg-dark text-white p-3 ${sidebarOpen ? 'position-fixed' : 'd-none'} d-lg-block`}
        style={{ 
          width: '250px', 
          minHeight: '100vh',
          zIndex: 1000,
          transition: 'all 0.3s'
        }}
      >
        <h4 className="mb-4">NGO Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-white bg-primary rounded">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
          <Link to="/admin/employees" className="nav-link text-white-50">Employee Mgmt</Link>        
          </li>
          <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-white-50">Payroll</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-white-50">Time & Attendance</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="#" className="nav-link text-white-50">Donation Reports</Link>
          </li>
          <li className="nav-item mt-5">
            <Link to="/" className="nav-link text-danger fw-bold">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light p-3 p-md-4">
        <h2 className="mb-4">Dashboard Overview</h2>

        {/* Top Stats Cards - Responsive grid */}
        <div className="row mb-4 g-3">
          <div className="col-6 col-lg-3">
            <div className="card text-white bg-primary mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Employees</h5>
                <p className="card-text display-6">124</p>
                <small>Total Active Staff</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card text-white bg-success mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Attendance</h5>
                <p className="card-text display-6">95%</p>
                <small>Present Today</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card text-white bg-warning mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Leave Requests</h5>
                <p className="card-text display-6">8</p>
                <small>Pending Approval</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card text-white bg-info mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Donations</h5>
                <p className="card-text display-6">₹50k</p>
                <small>Raised this Month</small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Section - Responsive */}
        <div className="row g-3">
          <div className="col-12 col-lg-8 mb-3 mb-lg-0">
            <div className="card shadow-sm">
              <div className="card-header bg-white fw-bold">Recent Activities</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                  <span>New volunteer registration: Rahul Kumar</span>
                  <span className="badge bg-secondary">2 mins ago</span>
                </li>
                <li className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                  <span>Donation received: ₹5,000 from Sarah J.</span>
                  <span className="badge bg-success">1 hour ago</span>
                </li>
                <li className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                  <span>Leave request: Priya (HR) - Sick Leave</span>
                  <span className="badge bg-warning text-dark">3 hours ago</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white fw-bold">Quick Actions</div>
              <div className="card-body d-grid gap-2">
                <button className="btn btn-outline-primary">Add New Employee</button>
                <button className="btn btn-outline-success">Generate Payroll</button>
                <button className="btn btn-outline-dark">View Reports</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

export default AdminDashboard;