import React, { useState, useEffect } from 'react';

export default function SubQ5_DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Setup the interval timer to tick every 1000ms (1 second)
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. Return cleanup callback to clear interval when component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Format Helper functions
  const formatTime = () => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');

    return {
      hours: formattedHours,
      minutes,
      seconds,
      ampm
    };
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString(undefined, options);
  };

  const { hours, minutes, seconds, ampm } = formatTime();

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden text-center">
      <div className="card-header bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-clock-fill me-2"></i>Digital Clock</h4>
      </div>
      <div className="card-body py-5 px-4 bg-light">
        
        {/* Simple digital display */}
        <div className="d-inline-flex flex-column align-items-center justify-content-center p-4 bg-white rounded-4 shadow-sm border mb-3">
          <div className="d-flex align-items-baseline gap-2 flex-nowrap mb-2">
            
            {/* Hours */}
            <div className="bg-light rounded-3 px-3 py-2 text-center border" style={{ minWidth: '70px' }}>
              <span className="display-4 fw-bold text-dark" style={{ fontFamily: 'monospace' }}>{hours}</span>
              <div className="text-muted small mt-1">HR</div>
            </div>

            <span className="display-4 fw-bold text-secondary">:</span>

            {/* Minutes */}
            <div className="bg-light rounded-3 px-3 py-2 text-center border" style={{ minWidth: '70px' }}>
              <span className="display-4 fw-bold text-dark" style={{ fontFamily: 'monospace' }}>{minutes}</span>
              <div className="text-muted small mt-1">MIN</div>
            </div>

            <span className="display-4 fw-bold text-secondary">:</span>

            {/* Seconds */}
            <div className="bg-light rounded-3 px-3 py-2 text-center border" style={{ minWidth: '70px' }}>
              <span className="display-4 fw-bold text-dark" style={{ fontFamily: 'monospace' }}>{seconds}</span>
              <div className="text-muted small mt-1">SEC</div>
            </div>

            {/* AM/PM */}
            <div className="ms-2 bg-primary text-white rounded-3 px-3 py-2 text-center" style={{ minWidth: '60px' }}>
              <span className="fs-4 fw-bold">{ampm}</span>
              <div className="text-white-50 small mt-1">AM/PM</div>
            </div>
            
          </div>

          <div className="mt-3">
            <h5 className="fw-semibold text-secondary m-0"><i className="bi bi-calendar-event me-2 text-primary"></i>{formatDate()}</h5>
          </div>
        </div>

      </div>
    </div>
  );
}
