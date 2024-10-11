
## Available Scripts
In the project directory, you can run:
### `npm start` To run the project

### Code Format
Run `npm run formate` command to formate the code.

### Deployment
I have deployed the project on versel please find the below link
[https://policy-insurance.vercel.app/]

### Extra Notes about Project
Insurance policy Project is developed on Reactcand redux only.

I did not use `localStorage` to saave user data and policy data.

Data loaded on Only Redux global store including Users,policies,purchased plocies,claims history etc.

I have store policy data in the redux store from `Data.json` file.
Data fetched asyncronously using thunk function. 
I have return Promise to handle state asyncronously in Thunk function

## Signing up 
Do registration of users and users saved in Redux Store.
Do not refresh the page after registration
## Login
For login user data accessing from redux store only.

## Feature
Register,
Login
AddToCompare
Purachse Policy
Policy History In Profile (User Able To See)
File Claim
Claim History
####
