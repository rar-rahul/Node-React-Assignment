import React from 'react';
import { useLocation } from 'react-router-dom';
function PolicyDetail() {
  const location = useLocation();
  const { policy } = location.state || {};
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{policy.policy_type} Policy</h2>
              <p className="card-text">
                <strong>Claim Type:</strong> {policy.claim_type}
              </p>
              <p className="card-text">
                <strong>Coverage Amount:</strong> Rs.{policy.coverage_amount}
              </p>
              <p className="card-text">
                <strong>Duration:</strong> {policy.mount}
              </p>
              <p className="card-text">
                <strong>Premium:</strong> Rs.{policy.details.premium}
              </p>
              <p className="card-text">
                <strong>Deductible:</strong> Rs.{policy.details.deductible}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {policy.details.description}
              </p>

              {/* Additional details like image and benefits */}
              <img
                src={policy.details.image}
                alt={policy.policy_type}
                className="img-fluid mb-3"
              />

              <h5 className="card-text">Benefits:</h5>
              <ul>
                {policy.details.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyDetail;
