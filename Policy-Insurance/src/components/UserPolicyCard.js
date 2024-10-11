import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UserPolicyCard = ({ policy }) => {
  const store = useSelector((state) => state.policy);
  const { currentUser } = useSelector((state) => state.user);
  const policyId = Number(policy.policyId);
  const findPolicy = store.policyData?.find(
    (policy) => policy.policy_id === policyId
  );
  
  const navigate = useNavigate();
  const handleFileClaim = () => {
    navigate('/claim', {
      state: { policyId: policyId, userID: currentUser._id },
    });
  };
  return (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Policy Id #{policy?.policyId} | {findPolicy?.claim_type} |{' '}
            {findPolicy?.policy_type} | Duration : {findPolicy?.mount} |
            <Button
              variant="primary"
              className="ml-5"
              onClick={handleFileClaim}
            >
              File Claim
            </Button>
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Policy Holder Name: </strong> {policy?.policyHolder}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Coverage Amount: </strong> Rs. {policy?.covrageAmount}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Purchase Date: </strong> {policy?.purchaseDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Details: </strong> {findPolicy?.details.description} |
              <strong>Premium: </strong> {findPolicy?.details.premium} |
              <strong>PaymentStatus: </strong> {policy?.paymentStatus}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserPolicyCard;
