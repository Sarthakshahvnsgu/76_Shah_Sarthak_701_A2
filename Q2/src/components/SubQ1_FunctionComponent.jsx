import React from 'react';

// Functional Component displaying Profile Details
export default function SubQ1_FunctionComponent({ 
  name = "Sarthak Shah", 
  rollNo = "76", 
  classDiv = "76 - B", 
  college = "Department of I.T.",
  course = "MSC I.T.",
  semester = "Semester 7"
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-gradient bg-primary text-white py-3 text-center">
        <h4 className="m-0 fw-bold"><i className="bi bi-person-badge me-2"></i>Functional Component Preview</h4>
      </div>
      <div className="card-body p-4">
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-mortarboard fs-1"></i>
          </div>
          <h3 className="fw-bold text-dark mb-1">{name}</h3>
          <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill fw-semibold">
            Roll No: {rollNo}
          </span>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <div className="p-3 bg-light rounded-3 border-start border-primary border-3">
              <span className="text-muted small d-block">Course</span>
              <span className="fw-semibold text-dark">{course}</span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-3 bg-light rounded-3 border-start border-primary border-3">
              <span className="text-muted small d-block">Semester & Div</span>
              <span className="fw-semibold text-dark">{semester} ({classDiv})</span>
            </div>
          </div>
          <div className="col-12">
            <div className="p-3 bg-light rounded-3 border-start border-primary border-3">
              <span className="text-muted small d-block">Institution</span>
              <span className="fw-semibold text-dark">{college}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
