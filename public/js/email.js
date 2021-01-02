const nodeMailer = require('nodemailer');

const sendMail = async options =>{
    console.log(options);
    const transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const mailOptions = {
        from:`${process.env.EMAIL_USER}`,
        to:`${options.email}`,
        subject:`${options.subject}`,
        text:`${options.message}`
    };
    
    await transporter.sendMail(mailOptions,function(err,inf){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(inf);
        }
    });
}

module.exports = sendMail;

