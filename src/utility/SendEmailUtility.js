const nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo,EmailText, EmailSubject) =>{
    
    let transporter = nodemailer.createTransport({

        // By Gmail SMTP
        // service: 'gmail',
        // auth: {
        //     user: 'your-email@gmail.com',
        //     pass: 'your-password'
        // }

        // By OWN Mail SMTP
        host: 'mail.teamrabbil.com',
        port:25,
        secure:false,
        auth:{
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls:{
            rejectUnauthorized:false
        },
    });


    let mailOptions = {
        from: 'Task Manager <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = SendEmailUtility;

