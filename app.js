var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

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


const userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);

