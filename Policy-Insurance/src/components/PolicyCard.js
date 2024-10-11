import React from 'react';
import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addToCompare, removeToCompare } from '../reducer/policySlice';
const PolicyCard = ({ policy }) => {
  const policyStore = useSelector((state) => state.policy);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleViewDetail = () => {
    navigate('/policyDetail', { state: { policy: policy } });
  };
  const handleAddCompare = (policyId) => {
    if (policyStore.selectedPolicies.includes(policyId)) {
      dispatch(removeToCompare(policyId));
    } else {
      dispatch(addToCompare(policyId));
    }
  };

  const handlePollicyPurchase = () => {
    if (isLoggedIn) {
      navigate('/purchase-policy', { state: { policy: policy } });
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          {/* Policy Type */}
          <h5 className="card-title">{policy.policy_type} Policy</h5>

          {/* Claim Type and Coverage Amount */}
          <p className="card-text">
            <strong>Claim Type:</strong> {policy.claim_type} <br />
            <strong>Coverage Amount:</strong> Rs.{policy.coverage_amount}
          </p>

          <p className="card-text">{policy.details.description}</p>

          <p className="card-text">
            <strong>Premium:</strong> Rs.{policy.details.premium} /{' '}
            {policy.duration} <br />
            <strong>Deductible:</strong> Rs.{policy.details.deductible}
          </p>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={policyStore.selectedPolicies.includes(policy.policy_id)}
              onChange={() => handleAddCompare(policy.policy_id)}
            />
            <label
              className="form-check-label"
              htmlFor={`selectPolicy-${policy.policy_id}`}
            >
              Add To Compare
            </label>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button onClick={handleViewDetail} className="btn btn-secondary">
            View Policy
          </button>

          <button onClick={handlePollicyPurchase} className="btn btn-primary">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(PolicyCard);
