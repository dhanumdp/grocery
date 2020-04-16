var mongoose = require('mongoose');

var express = require('express');

const {User} = require('../models/users');
const {Franchise} = require('../models/franchise');

var router = express.Router();

//Super Admin  Login
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
           if(user.role!="SuperAdmin")
           {
            res.json({success:false, message:'You are not a Super Admin'});   
           }
            else if(user.password != req.body.password) //create digest SHA2
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




//create Franchise

/*

    This route will work only after the user logged in and that user shoud be a SuperAdmin.

    and these checkings will be done in FrontEnd by handling session.

*/
router.post('/createFranchise',(req,res)=>{
     let franchise = new Franchise({
        franchiseId : req.body.franchiseId,
        pinCode : req.body.pinCode,
        city: req.body.city,
        district : req.body.district,
        country : req.body.country,
        franchiseName : req.body.franchiseName,
        createdBy : req.body.createdBy, // In front end it comes through session variable,
        franchiseAdmins : req.body.franchiseAdmins
    })

   Franchise.find({'pinCode': req.body.pinCode}).count((err,num)=>{
       if(num != 0)
       {
        res.json({success:false, message:'Franchise Exists'})
       }
       else
       {
           franchise.save((error,doc)=>{
            if(error)
            {
                res.json({success:false, message : 'Franchise Creation Failed '+error})
            }
            else
            {
                res.json({success:true, message : 'Franchise Created Successfully'})
            }
        })
       }
   })
})




module.exports = router;
