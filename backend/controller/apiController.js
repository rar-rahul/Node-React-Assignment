const User = require('../model/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req,res) => {
    try {
        const {name,email,mobile,password} = req.body
    //check existing user
    const existUser = await User.findOne({email:email})
    if(existUser){
       return res.status(500).json({
            "message":"User already registered",
             "status":'fail',
        })
    }
    //hash password using bcrypt
    const hashPassword = await bcrypt.hash(password,10)
    //save user into database
    const newUser = new User({name,email,mobile,password:hashPassword})
    await newUser.save()

    console.log(newUser)

    //genrate token using JWT token
    const token = jwt.sign({userId:newUser._id},process.env.TOKENSECRET)

    res.status(201).json({
        "status":'success',
        token,
        user:newUser,
        message:"User Successfully Registered with Us"
    })
    } catch (error) {
        res.status(401).json({
            "message":"Something wrong on server",
            "status":'fail',
        })
    }
}

const login = async(req,res) => { 

    try {
        const {email,password} = req.body
        //check user is exist or not 
        const user = await User.findOne({email:email})

        if(!user){
           return res.status(401).json({
                "message":"User Not Found In DB",
                 status:"Fail"
            })
        }
    
        //check password
        const checkPass = await bcrypt.compare(password,user.password)
        if(!checkPass){
            return res.status(401).json({
                "message":"Invalid crediential",
                 status:"Invalid"
            })
        }
        //genrate token
        const token = jwt.sign({userId:user._id},process.env.TOKENSECRET)
        return res.status(201).json({
            token:token,
            user:user,
            status:"Success"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Something wrong on server",
             status:"Fail"
        })
    }
   

}





module.exports = {register,login}