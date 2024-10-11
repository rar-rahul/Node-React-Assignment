const PurchasePolicy = require('../model/PurchasePolicies')
const Claim = require('../model/Claims')
const {sendEmail} = require('../sendEmail')
//purchase policy
const purchasePlicy = async (req,res) => {
        try {
        const {policyId,policyHolder,policyAge,covrageAmount,purchaseDate,user,usermail} = req.body
        const savePolicy = new PurchasePolicy({policyId,policyHolder,policyAge,covrageAmount,purchaseDate,user})
        await savePolicy.save()
        
        //calling sendmail function to sending mail
       const sendmail =  await sendEmail(usermail,'Policy Purchase Confirmation','Thank you for purchasing the policy')
       
            res.status(201).json({
                "status":"Success",
                savePolicy
            })
    
        } catch (Error) {

            res.status(403).json({
                "message":"Something error on server",
                "error":Error
            })
            
        }
}

//user policyis api
const getUserPolicy = async (req,res) => {
    try {
    const userId = req.userId
    const policies = await PurchasePolicy.find({user:userId})
        if(policies.length < 1){
            return res.status(403).json({
                "message":"Policies Not found"
            })
        }

    res.status(200).json({
        "status":"200",
         policies
    })
    } catch (error) {
        res.status(403).json({
            "message":"Something wrong on server"
        })
    }
}

//file policy claim

const claimPolicy = async (req,res) => {
    try {
    const claim = await new Claim(req.body)
    await claim.save()

    res.status(201).json({
        claim,
        status:"Success"
    })
        
    } catch (Error) {
        res.status(201).json({
            status:"Fail",
            error:Error,
            "message":"Something wrong on server"
        })
    }
}

//claim history of user

const getClaimHistory = async (req,res) => {
    try {
    const userId = req.userId
    const claims = await Claim.find({user:userId})
        if(claims.length < 1){
            return res.status(403).json({
                "message":"Claims Not found"
            })
        }
 
    res.status(200).json({
        "status":"200",
         claims
    })
    } catch (error) {
        res.status(403).json({
            "message":"Something wrong on server"
        })
    }
    
}

// Get all claims and purchase policies for admin 

const getAllClaims = async (req,res) => {
    try {
    const claims = await Claim.find()
        if(claims.length < 1){
            return res.status(403).json({
                "message":"Claims Not found"
            })
        }
 
    res.status(200).json({
        "status":"200",
         claims
    })
    } catch (error) {
        res.status(403).json({
            "message":"Something wrong on server"
        })
    }
}

const getAllPurchasePolicy = async (req,res) => {
    try {
    const policies = await PurchasePolicy.find()
        if(policies.length < 1){
            return res.status(403).json({
                "message":"Policies Not found"
            })
        }

    res.status(200).json({
        "status":"200",
         policies
    })
    } catch (error) {
        res.status(403).json({
            "message":"Something wrong on server"
        })
    }
}


const updateClaimStatus =  async (req,res) => {
        const claimId = req.params.claimId
        const data = req.body
        try {
           const updateClaim = await Claim.findByIdAndUpdate(claimId,data,{ new: true }
           ) 
           res.status(201).json({
            updateClaim
           })
        } catch (error) {
            res.status(403).json({
                "message":"something wrong on server"
            })
        }

}

///////////////////


module.exports = {purchasePlicy,getUserPolicy,claimPolicy,getClaimHistory,getAllPurchasePolicy,getAllClaims,updateClaimStatus}