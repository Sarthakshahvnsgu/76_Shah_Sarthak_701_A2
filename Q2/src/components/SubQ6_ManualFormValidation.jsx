import React, { useState } from 'react';

export default function SubQ6_ManualFormValidation() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manual Validation Helper Function
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full Name is required';
        } else if (value.trim().length < 3) {
          error = 'Name must be at least 3 characters long';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Phone number must be exactly 10 digits';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update input values
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Live validation (validate dynamically on change if the field has been touched/focused)
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    // Specific case: If password changes, revalidate confirm password
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = value === formData.confirmPassword ? '' : 'Passwords do not match';
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    // Trigger validation on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    setErrors(formErrors);

    // Check if form is valid (no errors keys have values)
    const isFormValid = Object.keys(formErrors).length === 0;
    if (isFormValid) {
      setIsSubmitted(true);
      // Optional: Clear form data
      // setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
      // setTouched({});
    }
  };

  // CSS feedback helpers
  const getInputClass = (name) => {
    if (!touched[name]) return 'form-control rounded-3';
    return errors[name] ? 'form-control rounded-3 is-invalid' : 'form-control rounded-3 is-valid';
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeIn">
      <div className="card-header bg-gradient bg-primary text-white py-3">
        <h4 className="m-0 fw-bold"><i className="bi bi-shield-lock-fill me-2"></i>Live Registration Form (Manual Validation)</h4>
      </div>
      <div className="card-body p-4">
        
        {isSubmitted && (
          <div className="alert alert-success border-0 rounded-3 mb-4 p-3 d-flex align-items-center gap-3">
            <i className="bi bi-check-circle-fill fs-4"></i>
            <div>
              <h6 className="fw-bold mb-0">Form Submitted Successfully!</h6>
              <span className="small text-success-emphasis">Manual validations passed. Account registered for <strong>{formData.fullName}</strong>.</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary"><i className="bi bi-person"></i></span>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClass('fullName')}
                placeholder="Enter your full name"
                required
              />
              {touched.fullName && !errors.fullName && <span className="input-group-text bg-success-subtle text-success"><i className="bi bi-check2"></i></span>}
            </div>
            {touched.fullName && errors.fullName && <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClass('email')}
                placeholder="you@example.com"
                required
              />
              {touched.email && !errors.email && <span className="input-group-text bg-success-subtle text-success"><i className="bi bi-check2"></i></span>}
            </div>
            {touched.email && errors.email && <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary"><i className="bi bi-telephone"></i></span>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getInputClass('phone')}
                placeholder="10-digit mobile number"
                maxLength="10"
                required
              />
              {touched.phone && !errors.phone && <span className="input-group-text bg-success-subtle text-success"><i className="bi bi-check2"></i></span>}
            </div>
            {touched.phone && errors.phone && <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.phone}</div>}
          </div>

          {/* Password */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary"><i className="bi bi-key"></i></span>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClass('password')}
                  placeholder="Min 6 characters"
                  required
                />
                {touched.password && !errors.password && <span className="input-group-text bg-success-subtle text-success"><i className="bi bi-check2"></i></span>}
              </div>
              {touched.password && errors.password && <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.password}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary"><i className="bi bi-key-fill"></i></span>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getInputClass('confirmPassword')}
                  placeholder="Repeat your password"
                  required
                />
                {touched.confirmPassword && !errors.confirmPassword && <span className="input-group-text bg-success-subtle text-success"><i className="bi bi-check2"></i></span>}
              </div>
              {touched.confirmPassword && errors.confirmPassword && <div className="text-danger small mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.confirmPassword}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2.5 fw-semibold shadow-sm">
            Register Account (Manual Validation)
          </button>
        </form>

      </div>
    </div>
  );
}
