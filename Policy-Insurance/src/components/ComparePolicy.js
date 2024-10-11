import React from 'react';
import { useSelector } from 'react-redux';
const ComparePolicy = () => {
  const policyData = useSelector((state) => state.policy.policyData);
  const selectedPolicy = useSelector((state) => state.policy.selectedPolicies);

  if (!policyData || !selectedPolicy) {
    return <div>Loading...</div>;
  }
  const policyToCompare = policyData.filter((policy) =>
    selectedPolicy.includes(policy.policy_id)
  );
  return (
    <div>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Compare Policies</h2>

        {policyToCompare.length > 0 ? (
          <div className="row">
            {policyToCompare?.map((policy) => (
              <div key={policy.policy_id} className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{policy.policy_type} Policy</h5>
                    <p>
                      <strong>Claim Type:</strong> {policy.claim_type}
                    </p>
                    <p>
                      <strong>Coverage Amount:</strong> Rs.
                      {policy.coverage_amount}
                    </p>
                    <p>
                      <strong>Premium:</strong> Rs.{policy.details.premium}
                    </p>
                    <p>
                      <strong>Deductible:</strong> Rs.
                      {policy.details.deductible}
                    </p>
                    <p>
                      <strong>Duration:</strong> {policy.mount}
                    </p>

                    {/* List of Benefits */}
                    <h6>Benefits:</h6>
                    <ul>
                      {policy.details.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            No policies selected for comparison.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePolicy;
