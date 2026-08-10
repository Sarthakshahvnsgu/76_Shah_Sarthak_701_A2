import React, { useState, useEffect } from 'react';

export default function SubQ9_StudentFilter() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDiv, setSelectedDiv] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  useEffect(() => {
    fetch('/students.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch student data: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredStudents = students.filter(student => {
    // Search by firstName (case-insensitive)
    const matchesSearch = student.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by semester
    const matchesSemester = selectedSemester === 'All' || student.semester === selectedSemester;
    
    // Filter by div
    const matchesDiv = selectedDiv === 'All' || student.div === selectedDiv;
    
    // Filter by gender
    const matchesGender = selectedGender === 'All' || student.gender === selectedGender;

    return matchesSearch && matchesSemester && matchesDiv && matchesGender;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSemester('All');
    setSelectedDiv('All');
    setSelectedGender('All');
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-gradient bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-funnel-fill me-2"></i>Student Search & Filters (Dynamic)</h4>
      </div>
      <div className="card-body p-4">
        
        {/* Controls Layout */}
        <div className="bg-light p-3 rounded-4 mb-4">
          <div className="row g-3">
            {/* Search Input */}
            <div className="col-lg-4 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Search First Name</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0 text-muted"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder="Enter name (e.g. Sarthak)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="btn btn-outline-secondary border-start-0 border-end border-top border-bottom bg-white" onClick={() => setSearchQuery('')}>
                    <i className="bi bi-x-circle text-muted"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Semester Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Semester</label>
              <select 
                className="form-select form-select-sm"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="All">All Semesters</option>
                <option value="3">Semester 3</option>
                <option value="5">Semester 5</option>
                <option value="7">Semester 7</option>
              </select>
            </div>

            {/* Division Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Division</label>
              <select 
                className="form-select form-select-sm"
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
              >
                <option value="All">All Divisions</option>
                <option value="A">Division A</option>
                <option value="B">Division B</option>
                <option value="C">Division C</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label small fw-semibold text-secondary">Gender</label>
              <select 
                className="form-select form-select-sm"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Clear Button */}
            <div className="col-lg-2 col-12 d-flex align-items-end">
              <button 
                className="btn btn-sm btn-outline-danger w-100 rounded-3 d-flex align-items-center justify-content-center gap-1"
                onClick={clearFilters}
                disabled={!searchQuery && selectedSemester === 'All' && selectedDiv === 'All' && selectedGender === 'All'}
              >
                <i className="bi bi-x-lg"></i> Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading / Error states */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading students...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger border-0 text-center p-4">
            <i className="bi bi-exclamation-octagon fs-1 text-danger mb-2 d-block"></i>
            <h5 className="fw-bold">Failed to Fetch Student Records</h5>
            <span className="small text-secondary">{error}</span>
          </div>
        )}

        {/* Content Table */}
        {!loading && !error && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">
                Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> student records
              </span>
              {(searchQuery || selectedSemester !== 'All' || selectedDiv !== 'All' || selectedGender !== 'All') && (
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 rounded-pill">
                  Filtered Results
                </span>
              )}
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-5 border rounded-4 bg-white">
                <i className="bi bi-search-heart fs-1 text-muted d-block mb-3"></i>
                <h5 className="text-dark fw-bold">No Students Match Search Filters</h5>
                <p className="text-secondary small mb-3">Try adjusting your keywords or clearing the active dropdown options.</p>
                <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={clearFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="table-responsive border rounded-3 overflow-hidden">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">Roll No</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col" className="text-center">Semester</th>
                      <th scope="col" className="text-center">Division</th>
                      <th scope="col">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td className="ps-4 fw-bold text-secondary">{student.rollNo}</td>
                        <td className="fw-bold text-dark">{student.firstName}</td>
                        <td className="text-secondary">{student.lastName}</td>
                        <td className="text-center">
                          <span className="badge bg-secondary-subtle text-secondary-emphasis px-2.5 py-1 rounded-2">
                            Sem {student.semester}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-2">
                            Div {student.div}
                          </span>
                        </td>
                        <td>
                          <span className="small text-secondary">
                            {student.gender === 'Male' ? (
                              <span><i className="bi bi-gender-male text-info me-1"></i> Male</span>
                            ) : (
                              <span><i className="bi bi-gender-female text-danger me-1"></i> Female</span>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
