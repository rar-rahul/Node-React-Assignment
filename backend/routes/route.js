const router = require('express').Router()
const userController = require('../controller/apiController')
const policyController = require('../controller/policyController')
const Auth = require('../middelware/auth')


//user routes of signup and login
router.post('/register',userController.register)
router.post('/login',userController.login)


//policy routes
router.post('/purchasePolicy', policyController.purchasePlicy)
router.get('/getPolicies', Auth, policyController.getUserPolicy)
router.post('/fileClaim', Auth, policyController.claimPolicy)
router.get('/getClaims', Auth, policyController.getClaimHistory)

//admin routes handlers
router.get('/getAllClaims', policyController.getAllClaims)
router.get('/getAllPurchasePolicies', policyController.getAllPurchasePolicy)
router.put('/updateClaimStatus/:claimId', policyController.updateClaimStatus)




module.exports = router

