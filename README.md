# Project Name

A Node.js backend application for managing insurance policies, filing claims, and handling user authentication.
This system allows users to purchase policies, file claims, and enables administrators to view all policies and claims.

## Features

- Authentication 1: User Can register and login 
- Purchase policy 2: After Signup User can purchase policy 
- Claim Filing 3: Userv can filing claim application
- Admin : Admin user can view user policy details and update claim status

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your chosen database)
- Mongoose 
- JWT 
- Bcrypt
- Nodemailer
- React for Frontend

## Installation

1. Clone the repository:
   git clone <repository-url>
   cd Insurance-policy - for frontend
   cd backend - for node backend
   npm install
   npm start - to start the both programm

2. I have installed concurrently We can run npm start on Parent folder ( Please rename Insurance policy folder to Frontend)

## Admin User 
 Admin User automatically will genrate when db connected 
 Username : admin@gmail.com
 Password : admin@123
 ==========================

 ## API ENDPOINT
http://127.0.0.1:8000/api/register
http://127.0.0.1:8000/api/login
http://127.0.0.1:8000/api/purchasePolicy - post -Purchase Policy 
http://127.0.0.1:8000/api/getPolicies
http://127.0.0.1:8000/api/fileClaim
http://127.0.0.1:8000/api/getClaims
## Admin Routes Endpoint 
http://127.0.0.1:8000/api/getAllClaims
http://127.0.0.1:8000/api/getAllPurchasePolicies
http://127.0.0.1:8000/api/updateClaimStatus/:claimId

___________________________________________________________________________________









