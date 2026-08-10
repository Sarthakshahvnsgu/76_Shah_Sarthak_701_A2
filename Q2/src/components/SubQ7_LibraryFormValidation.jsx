import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SubQ7_LibraryFormValidation() {
  const [submittedData, setSubmittedData] = useState(null);

  // Initialize React Hook Form with onChange validation mode for live feedback
  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields, isValid },
    reset
  } = useForm({
    mode: 'onChange' // Enables live validation on keypress/change
  });

  const onSubmit = (data) => {
    setSubmittedData(data);
    // Optional: Reset form after success
    // reset();
  };

  // Helper to determine styling
  const getInputClass = (fieldName) => {
    if (!touchedFields[fieldName]) return 'form-control rounded-3';
    return errors[fieldName] ? 'form-control rounded-3 is-invalid' : 'form-control rounded-3 is-valid';
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-gradient bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-box-fill me-2"></i>Live Registration Form (React Hook Form)</h4>
      </div>
      <div className="card-body p-4">
        
        {submittedData && (
          <div className="alert alert-success border-0 rounded-3 mb-4 p-3 d-flex align-items-center gap-3">
            <i className="bi bi-check-circle-fill fs-4 text-success"></i>
            <div>
              <h6 className="fw-bold mb-0">Library Validation Passed!</h6>
              <span className="small text-success-emphasis">
                Successfully registered email: <strong>{submittedData.email}</strong> (Age: {submittedData.age}).
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary"><i className="bi bi-person"></i></span>
              <input 
                type="text" 
                className={getInputClass('fullName')}
                placeholder="Enter full name"
                {...register('fullName', { 
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Name must contain only alphabets' }
                })}
              />
            </div>
            {errors.fullName && (
              <div className="text-danger small mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>{errors.fullName.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                className={getInputClass('email')}
                placeholder="email@domain.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address format'
                  }
                })}
              />
            </div>
            {errors.email && (
              <div className="text-danger small mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>{errors.email.message}
              </div>
            )}
          </div>

          <div className="row g-3 mb-3">
            {/* Age */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Age</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary"><i className="bi bi-calendar"></i></span>
                <input 
                  type="number" 
                  className={getInputClass('age')}
                  placeholder="Enter age"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 18, message: 'Must be at least 18 years old' },
                    max: { value: 100, message: 'Age cannot exceed 100' }
                  })}
                />
              </div>
              {errors.age && (
                <div className="text-danger small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>{errors.age.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary"><i className="bi bi-key"></i></span>
                <input 
                  type="password" 
                  className={getInputClass('password')}
                  placeholder="Create password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    pattern: {
                      value: /(?=.*[0-9])/,
                      message: 'Password must contain at least one digit'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <div className="text-danger small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>{errors.password.message}
                </div>
              )}
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="mb-4">
            <div className="form-check">
              <input 
                type="checkbox" 
                id="terms"
                className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                {...register('terms', { required: 'You must accept the terms & conditions' })}
              />
              <label className="form-check-label text-secondary small" htmlFor="terms">
                I agree to the terms of service and privacy policy.
              </label>
            </div>
            {errors.terms && (
              <div className="text-danger small mt-1">
                <i className="bi bi-exclamation-circle me-1"></i>{errors.terms.message}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 rounded-pill py-2.5 fw-semibold shadow-sm"
            disabled={!isValid}
          >
            Register Account (React Hook Form)
          </button>
        </form>

      </div>
    </div>
  );
}
