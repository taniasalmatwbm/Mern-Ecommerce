const nodeEmailer = require('nodemailer')


const sendEmail = async (options)=>{
       //userController  mein forgetPassword method mein sendMailer se option a rehi 
    const transporter = nodeEmailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user : process.env.SMPT_MAIL,
            pass : process.env.SMPT_PASSWORD,
        }
    });

    const mailOptions ={
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);

}


module.exports = sendEmail