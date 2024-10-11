const mongoose = require('mongoose');

// Define the schema directly
const ClaimSchema = new mongoose.Schema({
    policyId: { required: true, type: String },
    claimDescription: { required: true, type: String },
    amount: { required: true, type: String },
    dateOfIncident: { required: true, type: Date },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    claimStatus: { required: true, type: String, default:'Pending'},
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Create the model
const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
