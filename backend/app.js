const express = require('express')
const app = express()
const userRoutes = require('./routes/route')
const userController = require('./controller/apiController')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

//initiate middelware to parse data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//initiate cors
app.use(cors())

//initiate env config
dotenv.config()
const port = process.env.PORT
const Dburl = process.env.MONGO_URL
//connect database
mongoose.connect(Dburl)
.then(() => {
    console.log("Database connected")
    userController.createAdminUser()
})
.catch((Error) => console.log("connection error"+Error))


//running testing server is running
app.get('/',(req,res) => {
    res.send("test")
})

//Application routes of api
app.use('/api',userRoutes)


app.listen(port,() => {
    console.log(`Server is listening on ${port}`)
})


module.exports = app //export for testing