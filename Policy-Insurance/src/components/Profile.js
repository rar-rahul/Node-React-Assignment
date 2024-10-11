import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserPolicyCard from './UserPolicyCard';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // Get the user state from Redux
  const {token,currentUser,isLoggedIn} = useSelector((state) => state.user);
  const [policies,SetPolicies] = useState([])
  const userEmail = currentUser?.email;
  const navigate = useNavigate();

  const getPolicies = async () => {

      const response = await fetch('http://127.0.0.1:8000/api/getPolicies',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
           'Authorization': `${token}`
        },
      })
      const res = await response.json()
      console.log(res)
      if(res.status === '200'){
        SetPolicies(res.policies)
      }


  }


useEffect(() => {
  getPolicies()
},[])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <Card>
            <Card.Img
              variant="top"
              src="https://randomuser.me/api/portraits/men/1.jpg"
            />
            <Card.Body>
              <Card.Title>Name: {currentUser?.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {currentUser?.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Purchase Policies Section */}
        <div className="col-md-8">
          <h3 className="mb-4">Purchase Policies</h3>

          {/* Display policies */}
          {policies?.length > 0 ? (
            policies?.map((policy, index) => (
              <UserPolicyCard policy={policy} />
            ))
          ) : (
            <p>No purchase policies found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
