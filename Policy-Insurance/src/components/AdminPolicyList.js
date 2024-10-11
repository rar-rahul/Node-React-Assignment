import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AdminPolicyCard from './AdminPolicyCard'
import { useNavigate } from 'react-router-dom';

const AdminPolicyList = () => {
    const { currentUser, isLoggedIn,token} = useSelector(
        (state) => state.user
      );    
    const [policies,setPolicies] = useState([])
    const navigate = useNavigate();

    const getPolicies = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/getAllPurchasePolicies',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `${token}`
          },
        })
        const res = await response.json()
        setPolicies(res.policies)
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
    <div>

        {/* Purchase Policies Section */}
<div className="col-md-8 mx-auto">
  <h3 className="mb-4 text-center">All Users Purchase Policies</h3>

  {/* Display policies */}
  {policies?.length > 0 ? (
    <div className="row">
      {policies.map((policy, index) => (
        <div className="col-md-6 mb-4" key={index}>
          <AdminPolicyCard policy={policy} />
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center">No policies found of users.</p>
  )}
</div>

      
    </div>
  )
}

export default AdminPolicyList
