import React, { useState } from 'react';

export default function SubQ3_Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden text-center">
      <div className="card-header bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-plus-slash-minus me-2"></i>Counter Component</h4>
      </div>
      <div className="card-body p-5">
        <div className="mb-4">
          <p className="text-secondary small uppercase tracking-wider mb-2">Current Value</p>
          <div className="d-inline-flex align-items-center justify-content-center">
            <span 
              className="display-1 fw-bold px-5 py-2 rounded-4 bg-light text-dark border"
              style={{ minWidth: '180px' }}
            >
              {count}
            </span>
          </div>
        </div>

        {/* Counter controls */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-5">
          <button 
            className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-3 fw-semibold shadow-sm d-flex align-items-center gap-2"
            onClick={decrement}
          >
            <i className="bi bi-dash-circle fs-5"></i> Decrement
          </button>
          
          <button 
            className="btn btn-dark btn-lg rounded-pill px-4 py-3 fw-semibold shadow-sm d-flex align-items-center gap-2"
            onClick={reset}
          >
            <i className="bi bi-arrow-counterclockwise fs-5"></i> Reset
          </button>
          
          <button 
            className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-semibold shadow-sm d-flex align-items-center gap-2"
            onClick={increment}
          >
            <i className="bi bi-plus-circle fs-5"></i> Increment
          </button>
        </div>

        {/* Status message */}
        <div className="mt-5 p-3 rounded-3 bg-light text-secondary small">
          {count > 0 && <span>Count is positive</span>}
          {count < 0 && <span>Count is negative</span>}
          {count === 0 && <span>Count is at zero</span>}
        </div>
      </div>
    </div>
  );
}
