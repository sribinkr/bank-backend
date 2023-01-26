//Import mongoose

const mongoose = require('mongoose')

//using mongoose define connection string
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('MongoDB connected successfully');
})

//create model for thr project
//collection - users


 const User =  mongoose.model('User',{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]
})

//export model
module.exports={
    User
}