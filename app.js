//Basic Library Import
const express =require('express');
const router =require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Library Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors =require('cors');

//Database Library Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())


// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// MongoDB Database Connection
let URI = "mongodb+srv://pavel69:8UvuzZZIOeGDJkw5@cluster0.nd2laml.mongodb.net/todo?retryWrites=true&w=majority";
let OPTION = {user:'pavel69', pass:'8UvuzZZIOeGDJkw5', autoIndex:true}
// mongoose.connect(URI,OPTION,(error)=>{
//     console.log("MongoDB Connection Success");
//     console.log(error);
// })

//for mongoose 6.0.0
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



//Routing Implement
app.use("/api/v1",router)



//Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})


module.exports = app;