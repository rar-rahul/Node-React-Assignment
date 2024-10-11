import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';
import ClaimCard from './ClaimCard';
import {useNavigate } from 'react-router-dom';

const ClaimHistory = () => {
  const {currentUser,token,isLoggedIn} = useSelector((state) => state.user);
  const[claims,setClaims] = useState([])
  const [updateClaim,setUpdateClaim] = useState()
  const navigate = useNavigate();
  
  const getClaims = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/getClaims',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
         'Authorization': `${token}`
      },
    })
    const res = await response.json()
    console.log(res)
    if(res.status === '200'){
      setClaims(res.claims)
    }
}

const updateClaimStatus = (data) => {
  setUpdateClaim(data)
}

useEffect(() => {
  getClaims()
},[updateClaim])

useEffect(() => {
  if (!isLoggedIn) {
    navigate('/');
  }
}, [isLoggedIn]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Claim History for - {currentUser?.name}
      </h2>
      <div className="row">
        {claims?.length > 0 ? (
          claims?.map((claim) => (
            <ClaimCard claim={claim} key={claim._id} onUpdate={updateClaimStatus}/>
          ))
        ) : (
          <div className="text-center">
            <p>No claims found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;
