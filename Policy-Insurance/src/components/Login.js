import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login, resetErrorState } from '../reducer/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const users = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('')
    const response = await fetch('http://127.0.0.1:8000/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        // 'Authorization': `${token}`
      },
      body:JSON.stringify(data)
    })
    const res = await response.json()

    if(res.status === 'Success'){
      dispatch(login(res));
      setSuccessMessage("Successfully LoggedIn")
    }else{
      setErrorMessage(res.message)
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (users.isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [users.isLoggedIn]);

  useEffect(() => {
    dispatch(resetErrorState());
  }, []);
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div
      className="card shadow-lg p-4 bg-white rounded-lg w-100"
      style={{ maxWidth: '500px' }}
    >
      <h2 className="text-center mb-4">Login</h2>
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
      <form className="col-md-12 mx-auto" onSubmit={handleSubmit(handleLogin)}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isSubmitting ? 'Signing In...' : 'Login'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
