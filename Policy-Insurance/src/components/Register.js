import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignup = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      })
      const res = await response.json()

      console.log(res)

      if(res.status === 'success'){
        setTimeout(() => {
        setSuccessMessage(res.message);
        reset(); // Clear the form after successful submission
        navigate('/login');
      }, 2000);
      }else{
        setErrorMessage(res.message)
      }
    } catch (error) {
      setErrorMessage("something wrong on server")
    }finally{
      setIsSubmitting(false);
    }
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4 bg-white rounded-lg w-100"
        style={{ maxWidth: '500px' }}
      >
        <h2 className="text-center mb-4">Register</h2>
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

     {errorMessage && (
          <div className="alert alert-danger text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleSignup)} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Mobile</label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              id="mobile"
              placeholder="Enter your Mobile"
              {...register('mobile', {
                required: 'mobile is required',
               
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.mobile.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
