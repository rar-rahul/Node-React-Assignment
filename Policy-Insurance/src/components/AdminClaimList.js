import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClaimCard from './ClaimCard';
import { useNavigate } from 'react-router-dom';

const AdminClaimList = () => {
    const {token,currentUser,isLoggedIn} = useSelector((state) => state.user);
    const [updatedClaim,setUpdatedClaim] = useState()
    const navigate = useNavigate()
  const[claims,setClaims] = useState([])
    const getClaims= async () => {
        const response = await fetch('http://127.0.0.1:8000/api/getAllClaims',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `${token}`
          },
        })
        const res = await response.json()
        setClaims(res.claims)
      }

      const updateStatus = (updatedClaim) => {
        setUpdatedClaim(updatedClaim)
      }

      useEffect(() => {
        getClaims()
      },[updatedClaim])

      useEffect(() => {
        if (!isLoggedIn) {
          navigate('/');
        }
      }, [isLoggedIn]);

  return (
    <div>

<div className="container my-5">
      <h2 className="text-center mb-4">
        Claim History for - {currentUser?.name}
      </h2>
      <div className="row">
        {claims?.length > 0 ? (
          claims?.map((claim) => (
            <ClaimCard claim={claim} key={claim._id} onUpdate={updateStatus}/>
          ))
        ) : (
          <div className="text-center">
            <p>No claims found.</p>
          </div>
        )}
      </div>
    </div>
      
    </div>
  )
}

export default AdminClaimList
