const mongoose = require('mongoose')

const PurchasePolicySchema = new mongoose.Schema({

    policyId:{ required: true, type: String },
    policyHolder:{ required: true, type: String },
    policyAge:{ required: true, type: String },
    covrageAmount:{ required: true, type: String },
    purchaseDate:{ required: true, type: String },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const PurchasePolicy = mongoose.model('PurchasePolicy',PurchasePolicySchema)
module.exports = PurchasePolicy;