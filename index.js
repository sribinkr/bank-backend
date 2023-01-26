//import express inside index.js

const express = require('express')

//import cors

const cors = require('cors')

//Import dataService
const dataService = require('./services/dataService')

//import jsonwebtoken
const jwt = require('jsonwebtoken')


//create server app using express
const server = express()

//use cors
server.use(cors({
    origin:'http://localhost:4200'

}))

//to parse json data
server.use(express.json())

//setup port for server app
server.listen(3000,()=>{
    console.log('Server started at 3000');
})

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware ');
    next()
}

server.use(appMiddleware)

// bankapp front end request resolving

//token verify middleware
const jwtMiddleware =(req,res,next)=>{
    console.log('Inside router specific middleware');
    //get token from req header
    const token = req.headers['access-token']
    console.log(token);
     try{ //verify token
    const data = jwt.verify(token,'secretkey123')
    console.log(data);
    req.fromAcno = data.currentAcno
    console.log('valid token');
    next()
    }
    catch{
        console.log('valid token');
        res.status(401).json({
            message:'Please login!!'
        })

    }

}


//register api call resolving
server.post('/register',(req,res)=>{
    console.log('Inside register function');
    console.log(req.body);
    //asynchronous
    dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    
    })

})

// login api call resolving
server.post('/login',(req,res)=>{
    console.log('Inside Login Api');
    console.log(req.body);
    //asynchronous
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    
    })

})

//getbalance api
server.get('/getBalance/:acno',jwtMiddleware ,(req,res)=>{
    console.log('Inside getBalance Api');
    console.log(req.params.acno);
    //asynchronous
    dataService.getBalance(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    
    })

})

//deposit api
server.post('/deposit',jwtMiddleware ,(req,res)=>{
    console.log('Inside deposit Api');
    console.log(req.body);
    //asynchronous
    dataService.deposit(req.body.acno,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    
    })

})


//fundTransfer api
server.post('/fundTransfer',jwtMiddleware ,(req,res)=>{
    console.log('Inside fundTransfer Api');
    console.log(req.body);
    //asynchronous
    dataService.fundTransfer(req,req.body.toAcno,req.body.pswd,req.body.amount)
    .then((result)=>{

     res.status(result.statusCode).json(result)

    
    })

})

//get all transactions
server.get('/all-transactions',jwtMiddleware,(req,res)=>{
    console.log('Inside getAllTransactions api');
    dataService.getAllTransactions(req)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete account

server.delete('/delete-account/:acno',jwtMiddleware ,(req,res)=>{
    console.log('Inside delete-account Api');
    console.log(req.params.acno);
    //asynchronous
    dataService.deleteMyAccount(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    
    })

})