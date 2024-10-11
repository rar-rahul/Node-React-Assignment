import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const ClaimCard = ({ claim,onUpdate }) => {
  const store = useSelector((state) => state.policy);
  const { currentUser,isLoggedIn,token } = useSelector((state) => state.user);

  const policy = store.policyData?.find(
    (policy) => policy.policy_id === Number(claim.policyId)
  );

  const handleStatusChange = async (status,claimId) => {
    const data = {claimStatus:status}
    const response = await fetch(`http://127.0.0.1:8000/api/updateClaimStatus/${claimId}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })
    const res = await response.json()
    onUpdate(res)
  }

  return (
    <div className="col-md-6">
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>
            Claim #{claim.id} {policy?.policy_type}
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Policy Number: </strong> {claim.policyId} |{' '}
              {policy?.claim_type}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Date of Incident: </strong> {claim.dateOfIncident}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description: </strong> {claim.claimDescription}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Claim amount: </strong> Rs.{claim.amount}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status: </strong>
              <span
                className={`badge ${
                  claim.claimStatus === 'Approved'
                    ? 'bg-success'
                    : claim.claimStatus === 'Pending'
                      ? 'bg-warning text-dark'
                      : 'bg-danger'
                }`}
              >
                {claim.claimStatus}
              </span>
            </ListGroup.Item>
            {currentUser.role === 'admin' && (
               <select
               value={claim.claimStatus}
               onChange={(e) => handleStatusChange(e.target.value, claim._id)}
               className={`form-select ${
                 claim.claimStatus === 'Approved'
                   ? 'bg-success text-white'
                   : claim.claimStatus === 'Pending'
                   ? 'bg-warning text-dark'
                   : 'bg-danger text-white'
               }`}
             >
               <option value="Pending">Pending</option>
               <option value="Approved">Approved</option>
               <option value="Rejected">Rejected</option>
             </select>
            )}
           
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClaimCard;
