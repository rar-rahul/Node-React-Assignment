import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fileClaim } from '../reducer/userSlice';
const ClaimForm = () => {
  const { currentUser,isLoggedIn,token } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const { policyId, userId } = location.state || {};
  const navigate = useNavigate();

  //handle claim submit form
  const handleClaimSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fileClaim',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
           'Authorization': `${token}`
        },
        body:JSON.stringify(data)
      })
      const res = await response.json()
      if(res.status === 'Success'){
        setIsSubmitting(false)
        navigate('/claim-history');
      }else{
        setIsSubmitting(false)
        setErrorMessage("Something wrong on server")
      }
    } catch (error) {
      setIsSubmitting(false)
      setErrorMessage("Something wrong on server")
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4 bg-white rounded-lg w-100"
        style={{ maxWidth: '500px' }}
      >
        <h2 className="text-center mb-4">File a Claim</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(handleClaimSubmit)}>
          <input type="hidden" {...register('user')} value={currentUser._id} />
          <input type="hidden" {...register('policyId')} value={policyId} />
          <input type="hidden" {...register('claimStatus')} value="Pending" />
          {/* Claim Description */}
          <div className="mb-3">
            <label htmlFor="claimDescription" className="form-label">
              Claim Description:
            </label>
            <textarea
              className="form-control"
              id="claimDescription"
              {...register('claimDescription', {
                required: 'Claim description is required',
              })}
              placeholder="Describe the incident or reason for the claim"
            />
            {errors.claimDescription && (
              <p className="text-danger">{errors.claimDescription.message}</p>
            )}
          </div>

          {/* Payment of claim */}
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount Claim:
            </label>
            <input
              type="number"
              className="form-control"
              id="claimAmount"
              placeholder="Please Enter Claim Amount"
              {...register('amount', { required: 'Amount is required' })}
            />
            {errors.amount && (
              <p className="text-danger">{errors.amount.message}</p>
            )}
          </div>

          {/* Date of Incident */}
          <div className="mb-3">
            <label htmlFor="incidentDate" className="form-label">
              Date of Incident:
            </label>
            <input
              type="date"
              className="form-control"
              id="incidentDate"
              {...register('dateOfIncident', {
                required: 'Date of incident is required',
              })}
            />
            {errors.dateOfIncident && (
              <p className="text-danger">{errors.dateOfIncident.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimForm;
