const request = require('supertest');
const app = require('../app');
const User = require('../model/Users')
const Policies = require('../model/PurchasePolicies')
const claim = require('../model/Claims')


const bcrypt = require('bcrypt');

const testUser = {
    name: 'TestUser',
    email: 'TestUser@gmail.com',
    password: 'password123',
    mobile: '1234567890', 
    role:'user'
};


// beforeAll(async () => {
//     const hashedPassword = await bcrypt.hash(testUser.password, 10);
//     await User.create({ email: testUser.email, password: hashedPassword ,mobile: testUser.mobile,name: testUser.name,role:testUser.role});
// });

describe('Post/register',  () => {
    let token;
    let userId;
    it('Should reagister with new user',async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const response = await request(app)
        .post('/api/register')
        .send({
        name: testUser.name, 
        email: testUser.email, 
        password: 'password123',
        mobile: testUser.mobile ,
        role:testUser.role
        })
        
        expect(response.status).toBe(201);
    })

    it('should not register a user with existing email', async () => {
        const response = await request(app)
            .post('/api/register')
            .send(testUser);
        
        expect(response.statusCode).toBe(500);
        
    });

    //login test case
    it('should login as a user ', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });

            
            token = response.body.token
            userId = response.body.user._id
            expect(response.statusCode).toBe(201); 
            
           
    });

    it('should not log with invalid cred', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword', // Incorrect password
            });
        
        expect(response.statusCode).toBe(401);
    });

    it('should return error message for non-existing email', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'rrr@gmail.com', // Non-existing email
                password: testUser.password,
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    // policy purchase
    it('Should post policy purchase form', async () => {
        const response = await request(app)
            .post('/api/purchasePolicy')
            .set('authorization', `${token}`)
            .send({
                policyId: '1234',
                policyHolder: 'Policy Holder Name',
                policyAge: '30',
                covrageAmount: '1000',
                purchaseDate: '10/10/2024',
                user: userId,
            });

         
        expect(response.statusCode).toBe(201);
    });

      // get all purchase policy of user
    describe('Gell all purchase policies of user', () => {

        it('should retrieve all Policies', async () => {
            const response = await request(app)
            .get('/api/getPolicies')
            .set('authorization', `${token}`)
            
            expect(response.statusCode).toBe(200);
        });

        //file claim policy 
        it('should retrieve all Policies', async () => {
            const response = await request(app)
            .post('/api/fileClaim')
            .set('authorization', `${token}`)
            .send({
                policyId: '1234',
                claimDescription: 'Policy Related description of claim',
                amount: '10000',
                dateOfIncident: '10/10/2024',
                claimStatus: 'Pending',
                user: userId,
            })
            expect(response.statusCode).toBe(201);
        });

        //Get all claims
        it('should retrieve all Policies', async () => {
            const response = await request(app)
            .get('/api/getClaims')
            .set('authorization', `${token}`)
            
            expect(response.statusCode).toBe(200);
        });
    });


    describe('Gell all purchase policies and claim history for Admin', () => {

        it('should retrieve all Policies', async () => {
            const response = await request(app)
            .get('/api/getAllPurchasePolicies')

            expect(response.statusCode).toBe(200);
        });

        //Get all claims
        it('should retrieve all Policies', async () => {
            const response = await request(app)
            .get('/api/getAllClaims')
            expect(response.statusCode).toBe(200);
        });

    });


})


// Clean up test data after tests
afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
});