import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeMgmt() {
  const navigate = useNavigate();

  // Dummy Employee Data
  const employees = [
    { id: 101, name: "Rahul Sharma", role: "Project Manager", dept: "Field Ops", status: "Active" },
    { id: 102, name: "Priya Singh", role: "HR Executive", dept: "HR", status: "Active" },
    { id: 103, name: "Amit Verma", role: "Volunteer Lead", dept: "Outreach", status: "On Leave" },
    { id: 104, name: "Sneha Gupta", role: "Accountant", dept: "Finance", status: "Active" },
    { id: 105, name: "Vikram Das", role: "Field Coordinator", dept: "Field Ops", status: "Inactive" },
  ];

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back to Dashboard
      </button>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Management</h2>
        <button className="btn btn-primary">+ Add New Employee</button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    <div className="fw-bold">{emp.name}</div>
                  </td>
                  <td>{emp.role}</td>
                  <td>{emp.dept}</td>
                  <td>
                    <span className={`badge ${
                      emp.status === 'Active' ? 'bg-success' : 
                      emp.status === 'On Leave' ? 'bg-warning text-dark' : 'bg-secondary'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMgmt;