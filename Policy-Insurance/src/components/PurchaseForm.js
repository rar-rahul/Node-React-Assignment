import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const PurchaseForm = () => {
  const { formState, currentUser,isLoggedIn } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { policy } = location.state || {};
  const policyPremium = policy.details.premium;
  const navigate = useNavigate();
  //handle purchase handler
  const handlePurchasePolicy = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/purchasePolicy',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      })
      const res = await response.json()
      if(res.status === 'Success'){
        setIsSubmitting(false)
        setSuccessMessage("Successfully Purchased Policy Thank You")
        navigate('/profile')
      }

    } catch (error) {
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
        <h2 className="text-center mb-4">Purchase Policy Form</h2>
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
        <form onSubmit={handleSubmit(handlePurchasePolicy)}>
          {/* Policy Number */}
          <input
            type="hidden"
            {...register('user')}
            value={currentUser._id}
          />
           <input
            type="hidden"
            {...register('usermail')}
            value={currentUser.email}
          />
          <input type="hidden" {...register('paymentStatus')} value="unpaid" />

          <div className="mb-3">
            <label htmlFor="policyNumber" className="form-label">
              Policy Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyNumber"
              value={policy?.policy_id}
              {...register('policyId')}
              readOnly
            />
          </div>

          {/* Policy Holder Name */}
          <div className="mb-3">
            <label htmlFor="policyHolderName" className="form-label">
              Policy Holder Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyHolderName"
              {...register('policyHolder', {
                required: 'Policy Holder Name is required',
              })}
              placeholder="Please Enter Full Name"
            />
            {errors.policyHolderName && (
              <p className="text-danger">{errors.policyHolderName.message}</p>
            )}
          </div>
          {/* Policy Holder Age */}
          <div className="mb-3">
            <label htmlFor="policyHolderName" className="form-label">
              Policy Holder Age:
            </label>
            <input
              type="text"
              className="form-control"
              id="policyHolderAge"
              name="policyHolderAge"
              {...register('policyAge')}
              placeholder="Please Enter age"
            />
          </div>

          {/* Coverage Amount */}
          <div className="mb-3">
            <label htmlFor="coverageAmount" className="form-label">
              Coverage Amount (Rs):
            </label>
            <input
              type="number"
              className="form-control"
              id="coverageAmount"
              value={policy?.coverage_amount}
              {...register('covrageAmount')}
              required
            />
          </div>

          {/* Purchase Date */}
          <div className="mb-3">
            <label htmlFor="purchaseDate" className="form-label">
              Purchase Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="purchaseDate"
              {...register('purchaseDate')}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            {isSubmitting ? 'Processing' : 'Submit Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
