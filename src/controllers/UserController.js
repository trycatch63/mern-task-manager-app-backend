const UsersModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");

//User Registration
exports.registration = (req,res)=>{
    let reqBody = req.body;
    UsersModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(200).json({status:"fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// User Login
exports.login = (req,res)=>{
    let reqBody = req.body;
    UsersModel.aggregate([
        {$match:reqBody},
        {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }else{
            if(data.length>0){
                let Payload={exp: Math.floor(Date.now()/1000)+(24*60*60), data:data[0]['email']}
                let token = jwt.sign(Payload,'SecretKey123456789');
                res.status(200).json({status:"Success", token:token,data:data[0]})
            }else{
                res.status(401).json({status:"unauthorized"});
            }
        }

    })
}


// Profile Update
exports.profileUpdate=(req,res)=>{
    let email = req.headers['email'];
    let reqBody = req.body;
    UsersModel.updateOne({email:email},reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}


exports.profileDetails=(req,res)=>{
    let email = req.headers['email'];
    UsersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.recoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    try {
        // Email Account Query
        let UserCount = (await UsersModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        if(UserCount.length>0){
            // OTP Insert
            let CreateOTP = await OTPModel.create({email: email, otp: OTPCode})
            // Email Send
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is= "+OTPCode,"Task Manager PIN Verification")
            res.status(200).json({status: "success", data: SendEmail})
        }
        else{
            res.status(200).json({status: "fail", data: "No User Found"})
        }

    }catch (e) {
        res.status(200).json({status: "fail", data:e})
    }

}

