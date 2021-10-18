const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = async function (req, resp) {
    
    const email = req.body.email;
    var newEmail = false;
    var otp;
    var otpEmail = false;

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });

    if(req.body.email == null || req.body.email == ""){
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
    }else{
        if( await checkEmail()){
            if(newEmail){
                var result = await sendEmail();
                if(result === "success"){
    
                    var isOtpEmailPresent = await checkOtpEmail();
                    if(isOtpEmailPresent){
                        if(otpEmail){
                            var otpUpdated = await updateOtp();
                            if(otpUpdated){
                                conn.end();
                                resp.json({
                                    statusCode: "200",
                                    message: "email_sent"
                                });
                            }else{
                                conn.end();
                                resp.json({
                                    statusCode: "500",
                                    message: "email_could_not_be_sent"
                                });
                            }
                        }else{
                            var otpInserted = await insertOtp();
                            if(otpInserted){
                                conn.end();
                                resp.json({
                                    statusCode: "200",
                                    message: "email_sent"
                                });
                            }else{
                                conn.end();
                                resp.json({
                                    statusCode: "500",
                                    message: "email_could_not_be_sent"
                                });
                            }
                        }
                    }
                    
                }else{
                    conn.end();
                    resp.json({
                        statusCode: "500",
                        message: "email_could_not_be_sent"
                    });
                }
    
            }else{
                conn.end();
                resp.json({
                    statusCode: "200",
                    message: "email_already_registered"
                });
            }
    
        }else{
            conn.end();
            resp.json({
                statusCode: "500",
                message: "Something went wrong",
            })
        }
        
    
                   
    }  


    async function checkEmail(){
        return new Promise((resolve, reject)=> {
            conn.query('select * from users where email = ?', [email], (err, rows)=>{
                if (err) {
                    resolve(false);
                }else{
                    if(rows.length>0){
                        newEmail = false;
                        resolve(true);
                    }else{
                        newEmail = true;
                        resolve(true);
                    }
                }
            });
        });
    }

    async function checkOtpEmail(){
        return new Promise((resolve, reject)=> {
            conn.query('select * from otp_stage where email = ?', [email], (err, rows)=>{
                if (err) {
                    resolve(false);
                }else{
                    if(rows.length>0){
                        otpEmail = true;
                    }else{
                        otpEmail = false;
                    }
                    resolve(true);
                }
            });
        });
    }

    async function updateOtp(){
        return new Promise((resolve, reject)=> {
            conn.query('update otp_stage set otp = ? where email = ?', [otp, email ], (err, rows)=>{
                if (err) {
                    resolve(false);
                }else{
                    resolve(true);
                }
            });
        });
    }


    async function insertOtp(){
        return new Promise((resolve, reject)=> {
            conn.query('insert into otp_stage values ( ? , ? )', [email,otp ], (err, rows)=>{
                if (err) {
                    console.log(err);
                    resolve(false);
                }else{
                    resolve(true);
                }
            });
        });
    }

   
    async function sendEmail() {
        //OTP Generation
        otp = Math.floor(1000 + Math.random() * 9000);
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "premium34.web-hosting.com",
            auth: {
            user: 'emailfromtaushiq@taushiqswebsite.com', // generated ethereal user
            pass: 'ecom@ecom', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'emailfromtaushiq@taushiqswebsite.com', // sender address
            to: email, // list of receivers
            subject: "Ecommerce App Sign Up", // Subject line
            text: "OTP Verification", // plain text body
            html: "<h1>Your OTP to sign up in the Ecommerce App is <b>" + otp + "</b> </h1>", // html body
        });

        return "success";
      }


    
        
        

    
};