var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
const {User} = require('./models/users');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = process.env.PORT || 3000;

//split this file into seperate files..

// create db config file.

app.listen(port,()=>{
    console.log("Server Started at Port "+port);
})


mongoose.connect('mongodb://localhost:27017/GrocerySOS',{ useUnifiedTopology: true, useNewUrlParser : true },(err)=>{
    if(!err)
    {
        console.log('Database Connected !!');
    }
    else
    {
        console.log("Error in Database Connection "+err);
    }
});



//Registration for all users
app.post('/user/register',(req,res)=>{

    const user = new User({
    
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        role : req.body.role,
        address : req.body.address,
        contact : req.body.contact
    })
        
    User.find({'email': req.body.email}).count((err,num)=>{
        if(num != 0)
        {
         res.json({success:false, message:'Mail Id Exists. User Already Registered.'})
        }
        else
        {
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
        }


    })
});

//for customer
const customerRoutes = require('./routes/customerRoutes');
app.use('/customer',customerRoutes);

//for superAdmin
const superAdminRoutes = require('./routes/superAdminRoutes');
app.use('/superAdmin',superAdminRoutes);

//for franchiseAdmin
const franchiseAdminRoutes = require('./routes/franchiseAdminRoutes');
app.use('/franchiseAdmin',franchiseAdminRoutes);

//for vendorAdmin
const vendorAdminRoutes = require('./routes/vendorAdminRoutes');
app.use('/vendorAdmin',franchiseAdminRoutes);




