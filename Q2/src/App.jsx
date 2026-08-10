import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';

// Import subquestion components
import SubQ1_FunctionComponent from './components/SubQ1_FunctionComponent';
import SubQ2_ContainmentAndRendering from './components/SubQ2_ContainmentAndRendering';
import SubQ3_Counter from './components/SubQ3_Counter';
import SubQ4_UseStateUseRef from './components/SubQ4_UseStateUseRef';
import SubQ5_DigitalClock from './components/SubQ5_DigitalClock';
import SubQ6_ManualFormValidation from './components/SubQ6_ManualFormValidation';
import SubQ7_LibraryFormValidation from './components/SubQ7_LibraryFormValidation';
import SubQ8_EmployeeTable from './components/SubQ8_EmployeeTable';
import SubQ9_StudentFilter from './components/SubQ9_StudentFilter';

// Subquestions directory list
const subquestions = [
  { id: 1, path: '/sub1', title: '1) Function Component', desc: 'Display details using props and functional structure.', icon: 'person-badge', badge: 'Basic' },
  { id: 2, path: '/sub2', title: '2) Rendering & Lists', desc: 'Conditional rendering, list maps, nested cards, and children containment.', icon: 'layers-half', badge: 'Core' },
  { id: 3, path: '/sub3', title: '3) Counter Component', desc: 'Counter with increment, decrement, and reset states.', icon: 'plus-slash-minus', badge: 'State' },
  { id: 4, path: '/sub4', title: '4) useState & useRef', desc: 'Keystroke tracker vs input focus programmatic handlers.', icon: 'gear-wide-connected', badge: 'Refs' },
  { id: 5, path: '/sub5', title: '5) Digital Clock', desc: 'Real-time clock with useState and useEffect cleanup cycles.', icon: 'clock', badge: 'Effects' },
  { id: 6, path: '/sub6', title: '6) Manual Form Validation', desc: 'Live validations and manual regex check forms.', icon: 'shield-lock', badge: 'Forms' },
  { id: 7, path: '/sub7', title: '7) Library Form Validation', desc: 'Live validation with react-hook-form implementation.', icon: 'box-fill', badge: 'Forms' },
  { id: 8, path: '/sub8', title: '8) Fetch Employee Table', desc: 'Fetch local employees.json database into a tables list.', icon: 'people', badge: 'Fetch' },
  { id: 9, path: '/sub9', title: '9) Student Filter & Search', desc: 'Fetch students.json and perform live search and semester/gender filtering.', icon: 'funnel', badge: 'Filters' }
];

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        {/* Top Navbar */}
        <header className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3 px-4" style={{ height: '70px' }}>
          <div className="container-fluid d-flex justify-content-between">
            <Link to="/sub1" className="navbar-brand fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-code-slash text-info fs-4"></i>
              <span>Question 2 Components</span>
            </Link>
          </div>
        </header>

        <div className="container-fluid flex-grow-1">
          <div className="row">
            
            {/* Sidebar Navigation */}
            <nav className="col-md-3 col-lg-2 d-none d-md-block sidebar px-0 py-3">
              <div className="position-sticky">
                <div className="px-3 mb-3 text-secondary uppercase small fw-bold tracking-wider">
                  Question Navigation
                </div>
                <div className="nav flex-column">
                  {subquestions.map(sub => (
                    <NavLink 
                      key={sub.id}
                      to={sub.path} 
                      className={({ isActive }) => `nav-link nav-link-item text-dark d-flex align-items-center gap-2 ${isActive ? 'active-custom' : ''}`}
                    >
                      <i className={`bi bi-${sub.icon}`}></i> SubQ {sub.id} Demo
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            {/* Main Content Area */}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 flex-grow-1 bg-light bg-opacity-70 min-vh-90">
              <div className="container-fluid">
                
                {/* Router Outlet for Components */}
                <Routes>
                  <Route path="/" element={<Navigate to="/sub1" replace />} />
                  <Route path="/sub1" element={<SubQ1_FunctionComponent />} />
                  <Route path="/sub2" element={<SubQ2_ContainmentAndRendering />} />
                  <Route path="/sub3" element={<SubQ3_Counter />} />
                  <Route path="/sub4" element={<SubQ4_UseStateUseRef />} />
                  <Route path="/sub5" element={<SubQ5_DigitalClock />} />
                  <Route path="/sub6" element={<SubQ6_ManualFormValidation />} />
                  <Route path="/sub7" element={<SubQ7_LibraryFormValidation />} />
                  <Route path="/sub8" element={<SubQ8_EmployeeTable />} />
                  <Route path="/sub9" element={<SubQ9_StudentFilter />} />
                  <Route path="*" element={<Navigate to="/sub1" replace />} />
                </Routes>
              </div>
            </main>

          </div>
        </div>
      </div>
    </Router>
  );
}
