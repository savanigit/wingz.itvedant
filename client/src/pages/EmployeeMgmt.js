import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeMgmt() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // This runs automatically when the page loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Get data from your Python Backend
      const response = await axios.get('http://127.0.0.1:8000/api/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="container py-5">
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
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4">No Employees Found in Database</td></tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td><div className="fw-bold">{emp.name}</div></td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className={`badge ${
                        emp.status === 'Active' ? 'bg-success' : 
                        emp.status === 'On Leave' ? 'bg-warning text-dark' : 'bg-secondary'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMgmt;