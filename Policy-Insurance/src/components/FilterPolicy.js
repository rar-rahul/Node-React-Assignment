import React from 'react';

const FilterPolicy = ({ policy }) => {
  return (
    <div>
      <div key={policy.policy_id} className="col-md-4 mb-4">
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
          </div>

          <div className="card-footer d-flex justify-content-between">
            <a href="#" className="btn btn-secondary">
              View Policy
            </a>
            <a href="#" className="btn btn-primary">
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPolicy;
