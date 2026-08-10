import React, { useState, useRef } from 'react';

export default function SubQ4_UseStateUseRef() {
  // state for live preview (causes re-renders)
  const [inputValue, setInputValue] = useState('');
  const [renderCount, setRenderCount] = useState(1);

  // 1. DOM reference to the input element
  const inputRef = useRef(null);

  // 2. Mutable value reference (survives renders, but does not trigger re-render)
  const changeTrackerRef = useRef(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Increment the ref value on every change
    changeTrackerRef.current += 1;
    // Keep track of render counts to prove refs don't trigger renders
    setRenderCount(prev => prev + 1);
  };

  const handleFocusClick = () => {
    // Focus the input element using the DOM reference
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearClick = () => {
    setInputValue('');
    // Notice: we don't reset the keystroke tracker unless explicitly wanted
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-gear-wide-connected me-2"></i>useState & useRef Demo</h4>
      </div>
      <div className="card-body p-4">
        
        <div className="row g-4">
          {/* Left panel: Input Area */}
          <div className="col-lg-6">
            <h5 className="fw-bold mb-3 text-dark">Interactive Playground</h5>
            <div className="mb-3">
              <label htmlFor="refInput" className="form-label fw-semibold text-secondary">Type something below:</label>
              <input 
                id="refInput"
                type="text" 
                ref={inputRef} // Attaching DOM reference
                className="form-control form-control-lg rounded-3 shadow-sm"
                placeholder="Start typing..."
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="d-flex gap-2 mb-3">
              <button 
                className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={handleFocusClick}
              >
                <i className="bi bi-cursor-fill"></i> Focus Input (useRef DOM)
              </button>
              
              <button 
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={handleClearClick}
                disabled={!inputValue}
              >
                Clear Input
              </button>
            </div>

            <div className="p-3 bg-light rounded-3 border">
              <h6 className="fw-bold mb-2 text-dark">Live Output Preview (useState):</h6>
              <div className="p-3 bg-white rounded border min-vh-10 d-flex align-items-center justify-content-center text-center">
                {inputValue ? (
                  <span className="fs-5 text-dark fw-medium text-break">{inputValue}</span>
                ) : (
                  <span className="text-muted italic">Type above to see live preview updates...</span>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: React hooks analysis */}
          <div className="col-lg-6">
            <h5 className="fw-bold mb-3 text-dark">State & Ref Tracker</h5>
            
            <div className="list-group rounded-3 mb-4">
              <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                  <h6 className="fw-bold mb-0 text-dark">useState Value</h6>
                  <small className="text-muted">Dynamic text value state</small>
                </div>
                <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
                  {inputValue ? `"${inputValue}"` : 'empty'}
                </span>
              </div>

              <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                  <h6 className="fw-bold mb-0 text-dark">useRef Keystroke Counter</h6>
                  <small className="text-muted">Increments on keystroke without re-rendering</small>
                </div>
                <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
                  {changeTrackerRef.current} changes
                </span>
              </div>

              <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Component Render Count</h6>
                  <small className="text-muted">Total component renders</small>
                </div>
                <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
                  {renderCount} renders
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
