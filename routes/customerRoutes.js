var mongoose = require('mongoose');

var express = require('express');

const {User} = require('../models/users');
const {Franchise} = require('../models/franchise');

var router = express.Router();


//User registeration
router.post('/register',(req,res)=>{

const user = new User({

    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password,
    role : req.body.role,
    address : req.body.address,
    contact : req.body.contact
})
    
user.save((err,doc)=>{
    if(err)
    {
        res.json({success:false, message : 'Registration Failed '+err})
    }
    else
    {
        res.json({success:true, message : 'User Registered Successfully'})
    }
})
});
//User Login
router.post('/login', (req,res)=>{

    console.log(req.body.email);
   User.findOne({'email':req.body.email}, (err,user)=>{
       if(err)
       {
        res.json({success:false, message : err});
       }
       else
       {
           if(!user)
           {
               res.json({success:false, message:'User not yet Registered'});
           }
           else
        {
           if(user.password != req.body.password) //create digest SHA2
           {
            res.json({success:false, message:'Incorrect Password'})
           }
           else
           {
               res.json({success:true, message : 'User Found'});
           }
        }
       }
   })
});






module.exports = router;

