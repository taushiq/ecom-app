const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = async function (req, resp) {
    
    const otpvalue = req.body.otpvalue;
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const lineone = req.body.lineone;
    const linetwo = req.body.linetwo;
    const pincode = req.body.pin;
    const state = req.body.state;
    const city = req.body.city;
    const country = req.body.country;
    const phone = req.body.mobile;
    
    var otpFetchedValue = null;
    const conn = mysql.createConnection(mysqlCfg);
    
    if(otpvalue == null || email == null || password == null || fname == null || lname == null || lineone == null || linetwo == null || pincode == null || city == null || state == null || country == null || phone == null){
        resp.json({
            statusCode: "200",
            message: "value_missing"
        });
    }else{
        conn.on('error', function(err) {
            resp.json({
                statusCode: "500",
                message: "Something went wrong",
            })
          });
    
        if(req.body.email == null || req.body.email == ""){
            resp.json({
                statusCode: "500",
                message: "Something went wrong",
            })
        }else{
            const fetchOtpResult = await fetchOtp();
            if(fetchOtpResult){
                if(req.body.otpvalue != otpFetchedValue){
                    resp.json({
                        statusCode: "500",
                        message: "otp_mismatch",
                    })
                }else{
                    const isUserRegistered = await registerUser();
                    if(isUserRegistered){
                        resp.json({
                            statusCode: "200",
                            message: "success",
                        });
                    }else{
                        resp.json({
                            statusCode: "500",
                            message: "Something went wrong",
                        });
                    }
                }
            }else{
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }
        
                       
        }  
    
    }
    
    
    

    async function fetchOtp(){
        return new Promise((resolve, reject)=> {
            conn.query('select * from otp_stage where email = ?', [email], (err, rows)=>{
                if (err) {
                    resolve(false);
                }else{
                    if(rows.length>0){
                        otpFetchedValue = rows[0].otp;
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                }
            });
        });
    }

    async function registerUser(){
        return new Promise((resolve, reject)=> {
            conn.query('insert into users (username, password , email , fname, lname, type) values (? , ? , ? , ?, ?, ?)', 
            [email, password, email, fname, lname , 'user' ], (err, rows)=>{
                if (err) {
                    resolve(false);
                }else{
                    resolve(true);  
                }
            });
        });
    }

    //function to fetch user id

    //function to insert User Address
    

   
    

    
        
        

    
};