const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = function (req, resp) {

    orderDetails = req.body;
    email = orderDetails.email;
    orderDetails.address_details = JSON.parse(orderDetails.address_details);
    
    try{
        sendEmail();
        resp.json({
            "statusCode": "200",
            "message": "success"
        })
    }
    catch(Exception){
        resp.json({
            "statusCode": "500",
            "message": "something_went_wrong"
        })
    }



    async function sendEmail() {
            
            
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
            user: 'taushiq.awais007@gmail.com', // generated ethereal user
            pass: 'Aasiakhatoon', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Taushiq Awais <taushiq.awais007@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Out for Delivery", // Subject line
            text: "Your Order is Out for Delivery", // plain text body
            html: "<h1>Greetings from Ecommerce App! <br><br> Your Order for " + orderDetails.productName +  " is out for Delivery at the address <br> <br>" + orderDetails.address_details.address + ", " + orderDetails.address_details.zipcode + ", " + orderDetails.address_details.city // html body
        });

        return "success";
      }

       
    
};