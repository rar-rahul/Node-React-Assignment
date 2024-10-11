import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import data from '../data.json';
import { fetchPolicyData, fetchData } from '../reducer/policySlice';
import PolicyCard from './PolicyCard';
const Home = () => {
  const policy = useSelector((state) => state.policy);
  const policyCategory = policy.policyData.map((policy) => policy.claim_type);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(fetchPolicyData(data))
    //dispatching thunk function to load data asyncronusly
    dispatch(fetchData());
  }, []);

  if (policy.status == 'Error') return <div>Error</div>;
  return (
    <div className="container mt-4">
      {/* Filtered Policy */}
      {policy.isFilter && (
        <section>
          <h2 className="text-center mt-5 mb-4">Filtered Policies</h2>
          {policy.status == 'Pending' ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '100vh' }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {policy.filterPolicy.length > 0 ? (
                policy.filterPolicy?.map((policy) => (
                  <PolicyCard policy={policy} key={policy.policy_id} />
                ))
              ) : (
                <div>
                  <h4 className="text-center">
                    No policies match your filter.
                  </h4>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Featured Policies */}
      <section>
        <h2 className="text-center mt-5 mb-4">Featured Policies</h2>

        {policy.status === 'Pending' ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {policy.policyData?.map((policy) => (
              <PolicyCard policy={policy} key={policy.policy_id} />
            ))}
          </div>
        )}
      </section>
      {/* Policy Categories */}
      <section>
        <h2 className="text-center mb-4">Categories of Policies</h2>
        <div className="row">
          {policyCategory.map((type, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{type}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
