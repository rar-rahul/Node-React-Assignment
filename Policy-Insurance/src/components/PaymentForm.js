import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { purchasePolicy } from '../reducer/userSlice';
import { payment } from '../reducer/userSlice';
const PaymentForm = () => {
  const { currentUser, isLoggedIn, purchasedPolicy } = useSelector(
    (state) => state.user
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { policy, formData } = location.state || {};
  const navigate = useNavigate();
  const handlePayment = () => {
    setLoading(true);
    //updating payment status
    formData.paymentStatus = 'Paid';
    setTimeout(() => {
      dispatch(purchasePolicy(formData));
      setLoading(false);
      if (!loading) {
        navigate('/');
      }
    }, 2000);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  if (!policy?.policy_id)
    return (
      <div>
        <h3>Unauthorised access</h3>
      </div>
    );
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Header className="text-center">
              <h3>Payment Details</h3>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-4">Policy Details</h5>
              <p>
                <strong>Policy Number:</strong> {policy?.policy_id}
              </p>
              <p>
                <strong>Coverage Amount:</strong> Rs. {policy?.coverage_amount}
              </p>
              <p>
                <strong>Policy Type:</strong> {policy?.policy_type}
              </p>
              <hr />
              <h5 className="mb-4">Premium Amount</h5>
              <p>
                <strong>Total Premium:</strong> Rs. {policy?.details.premium}
              </p>
              <Button
                variant="primary"
                onClick={handlePayment}
                className="w-100"
              >
                {loading ? 'Processing Payment' : 'Pay Now'}
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
