import React, { useState } from 'react';

// 1. Reusable Children Containment Component (Demonstrates Containment / props.children)
function AcademyCardBox({ title, icon, borderClass = "border-primary", children }) {
  return (
    <div className={`card border-0 shadow-sm rounded-4 overflow-hidden mb-4 border-top border-4 ${borderClass}`}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-light p-2 rounded-3 me-3 text-primary d-flex align-items-center justify-content-center">
            <i className={`bi bi-${icon} fs-4`}></i>
          </div>
          <h5 className="fw-bold m-0 text-dark">{title}</h5>
        </div>
        <div className="containment-content">
          {children} {/* This is where child elements are rendered */}
        </div>
      </div>
    </div>
  );
}

// 2. Nested Component (Demonstrates Nested Components)
function CourseCard({ id, title, instructor, duration, level, isEnrolled, rating, viewMode, onEnrollToggle }) {
  const isGridView = viewMode === 'grid';
  return (
    <div className={isGridView ? "col-md-6 col-lg-4" : "col-12 mb-3"}>
      <div className="card h-100 border shadow-sm rounded-3 overflow-hidden">
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className={`badge ${level === 'Advanced' ? 'bg-danger' : level === 'Intermediate' ? 'bg-warning text-dark' : 'bg-success'} px-2 py-1`}>
                {level}
              </span>
              <span className="text-secondary small fw-bold">
                <i className="bi bi-star-fill text-warning me-1"></i> {rating}
              </span>
            </div>
            <h6 className="fw-bold text-dark mb-1">{title}</h6>
            <p className="text-muted small mb-2">By {instructor}</p>
            <div className="d-flex gap-3 text-secondary small mb-3">
              <span><i className="bi bi-clock me-1"></i> {duration}</span>
              <span><i className="bi bi-book me-1"></i> {id * 3} Lessons</span>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
            {/* Conditional Rendering inside Nested Component */}
            {isEnrolled ? (
              <span className="text-success small fw-semibold">
                <i className="bi bi-check-circle-fill me-1"></i> Enrolled
              </span>
            ) : (
              <span className="text-muted small">Available</span>
            )}
            <button 
              className={`btn btn-sm ${isEnrolled ? 'btn-outline-danger' : 'btn-primary'} rounded-pill px-3`}
              onClick={() => onEnrollToggle(id)}
            >
              {isEnrolled ? 'Drop Course' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Main Outer Component
export default function SubQ2_ContainmentAndRendering() {
  // Course List state (Demonstrates List rendering)
  const [courses, setCourses] = useState([
    { id: 1, title: "Modern React 18 for Beginners", instructor: "Dr. A. K. Patel", duration: "12 hours", level: "Beginner", rating: 4.8, isEnrolled: true },
    { id: 2, title: "Advanced Node.js & Microservices", instructor: "Prof. Rajesh Sen", duration: "24 hours", level: "Advanced", rating: 4.9, isEnrolled: false },
    { id: 3, title: "UI/UX Foundations with Figma", instructor: "Meera Nair", duration: "8 hours", level: "Beginner", rating: 4.6, isEnrolled: false },
    { id: 4, title: "Full Stack MERN Developer bootcamp", instructor: "Sarthak Shah", duration: "48 hours", level: "Intermediate", rating: 5.0, isEnrolled: true },
    { id: 5, title: "Database Systems: SQL & MongoDB", instructor: "Amit Vyas", duration: "18 hours", level: "Intermediate", rating: 4.7, isEnrolled: false }
  ]);

  // Layout View State (Demonstrates Conditional Rendering)
  const [viewMode, setViewMode] = useState('grid');
  // Filter level State (Demonstrates Conditional Rendering)
  const [filterLevel, setFilterLevel] = useState('All');

  const handleEnrollToggle = (courseId) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, isEnrolled: !course.isEnrolled } : course
      )
    );
  };

  const clearAllCourses = () => {
    setCourses([]);
  };

  const resetCoursesList = () => {
    setCourses([
      { id: 1, title: "Modern React 18 for Beginners", instructor: "Dr. A. K. Patel", duration: "12 hours", level: "Beginner", rating: 4.8, isEnrolled: true },
      { id: 2, title: "Advanced Node.js & Microservices", instructor: "Prof. Rajesh Sen", duration: "24 hours", level: "Advanced", rating: 4.9, isEnrolled: false },
      { id: 3, title: "UI/UX Foundations with Figma", instructor: "Meera Nair", duration: "8 hours", level: "Beginner", rating: 4.6, isEnrolled: false },
      { id: 4, title: "Full Stack MERN Developer bootcamp", instructor: "Sarthak Shah", duration: "48 hours", level: "Intermediate", rating: 5.0, isEnrolled: true },
      { id: 5, title: "Database Systems: SQL & MongoDB", instructor: "Amit Vyas", duration: "18 hours", level: "Intermediate", rating: 4.7, isEnrolled: false }
    ]);
  };

  // Filter logic (Demonstrates List filtering)
  const filteredCourses = courses.filter(course => 
    filterLevel === 'All' ? true : course.level === filterLevel
  );

  return (
    <div className="animate__animated animate__fadeIn">
      {/* AcademyCardBox using containment to host header controls */}
      <AcademyCardBox title="Course Management Control Center" icon="sliders" borderClass="border-primary">
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <span className="small text-muted fw-semibold">Filter Level:</span>
            <select 
              className="form-select form-select-sm rounded-3 border-secondary-subtle" 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <div className="btn-group btn-group-sm border rounded-3 p-1 bg-light">
              <button 
                className={`btn btn-sm border-0 rounded-2 ${viewMode === 'grid' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <i className="bi bi-grid-fill"></i> Grid
              </button>
              <button 
                className={`btn btn-sm border-0 rounded-2 ${viewMode === 'list' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <i className="bi bi-list-task"></i> List
              </button>
            </div>
            
            {courses.length > 0 ? (
              <button className="btn btn-sm btn-outline-danger rounded-3" onClick={clearAllCourses}>
                <i className="bi bi-trash3 me-1"></i> Clear List
              </button>
            ) : (
              <button className="btn btn-sm btn-outline-success rounded-3" onClick={resetCoursesList}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset List
              </button>
            )}
          </div>
        </div>
      </AcademyCardBox>

      {/* Conditional Rendering of empty state vs list */}
      {filteredCourses.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5">
          <div className="card-body">
            <div className="d-inline-flex p-3 bg-danger-subtle text-danger rounded-circle mb-3">
              <i className="bi bi-folder-x fs-1"></i>
            </div>
            <h4 className="fw-bold text-dark mb-1">No Courses Found</h4>
            <p className="text-secondary mb-3">
              {courses.length === 0 
                ? "You cleared the course catalog. Click reset above to restore courses."
                : `No courses match the level filter "${filterLevel}".`}
            </p>
            {courses.length === 0 && (
              <button className="btn btn-success rounded-pill px-4" onClick={resetCoursesList}>
                Restore Catalog
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Render Lists inside Grid or List View conditionally */
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h5 className="fw-bold text-dark mb-4">
            <i className="bi bi-book-half text-primary me-2"></i>
            Active Catalog ({filteredCourses.length} Courses)
          </h5>
          <div className={viewMode === 'grid' ? "row g-3" : "d-flex flex-column"}>
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                duration={course.duration}
                level={course.level}
                isEnrolled={course.isEnrolled}
                rating={course.rating}
                viewMode={viewMode}
                onEnrollToggle={handleEnrollToggle}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
