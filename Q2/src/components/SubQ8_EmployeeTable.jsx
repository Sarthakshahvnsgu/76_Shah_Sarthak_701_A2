import React, { useState, useEffect } from 'react';

export default function SubQ8_EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from local public directory
    fetch('/employees.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Department Badge Helper
  const getDeptBadgeClass = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering': return 'bg-primary-subtle text-primary border-primary-subtle';
      case 'product': return 'bg-success-subtle text-success border-success-subtle';
      case 'design': return 'bg-info-subtle text-info border-info-subtle';
      case 'human resources': return 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
      case 'analytics': return 'bg-danger-subtle text-danger border-danger-subtle';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-gradient bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-people-fill me-2"></i>Employee Directory (JSON Fetch)</h4>
      </div>
      <div className="card-body p-4">
        
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading employees...</span>
            </div>
            <p className="text-muted mt-3">Fetching employee database records...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger border-0 rounded-3 p-4 text-center">
            <i className="bi bi-exclamation-triangle-fill fs-1 text-danger mb-3 d-block"></i>
            <h5 className="fw-bold">Database Read Error</h5>
            <p className="text-secondary small mb-3">{error}</p>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-4" onClick={() => window.location.reload()}>
              Retry Fetching
            </button>
          </div>
        )}

        {!loading && !error && employees.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-folder2-open fs-1 text-muted d-block mb-3"></i>
            <h5 className="text-dark fw-bold">No Records Found</h5>
            <p className="text-secondary small">The employee database is currently empty.</p>
          </div>
        )}

        {!loading && !error && employees.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small fw-semibold">Data loaded from: <code>public/employees.json</code></span>
              <span className="badge bg-dark rounded-pill px-3 py-2">{employees.length} Employees</span>
            </div>
            
            <div className="table-responsive border rounded-3 overflow-hidden">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-4">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Department</th>
                    <th scope="col" className="text-end pe-4">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td className="ps-4 fw-semibold text-secondary">{emp.id}</td>
                      <td className="fw-bold text-dark">{emp.name}</td>
                      <td><a href={`mailto:${emp.email}`} className="text-decoration-none text-muted small"><i className="bi bi-envelope me-1"></i>{emp.email}</a></td>
                      <td><span className="small text-secondary fw-medium">{emp.role}</span></td>
                      <td>
                        <span className={`badge border px-2.5 py-1.5 rounded-3 ${getDeptBadgeClass(emp.department)}`}>
                          {emp.department}
                        </span>
                      </td>
                      <td className="text-end pe-4 fw-bold text-primary">
                        ${emp.salary?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
