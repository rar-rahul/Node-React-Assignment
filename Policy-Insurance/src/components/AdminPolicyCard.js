import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UserPolicyCard = ({ policy }) => {
  const store = useSelector((state) => state.policy);
  const policyId = Number(policy.policyId);
  const findPolicy = store.policyData?.find(
    (policy) => policy.policy_id === policyId
  );

  return (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Policy Id #{policy.policyId} 
           
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Policy Holder Name: </strong> {policy.policyHolder}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Coverage Amount: </strong> Rs. {policy.covrageAmount}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Purchase Date: </strong> {policy.purchaseDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Details: </strong> {findPolicy?.details.description} |
              <strong>Premium: </strong> {findPolicy?.details.premium} |
             
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserPolicyCard;
