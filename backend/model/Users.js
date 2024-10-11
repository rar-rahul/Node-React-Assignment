const mongoose = require('mongoose');

// Define the schema directly
const UserSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    mobile: { required: true, type: String },
    password: { required: true, type: String },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});

// Create the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
