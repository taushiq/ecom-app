const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = function (req, resp) {

    deliveryDate = req.query.deliveryDate;
    orderId = req.query.orderId;
    productName = req.query.productName;
    email = req.query.email;

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('update order_details set delivery_date = ? where id = ?', [ deliveryDate, orderId ],
        (err, rows) => {
            if (err) {
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                
                sendEmail();
                resp.json({
                    statusCode: "200",
                    data: rows
                })}
                

        });


        async function sendEmail() {
            
            
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
                subject: "Order Delivery Date", // Subject line
                text: "Your Order Delivery Date Update", // plain text body
                html: "<h1>Greetings from Ecommerce App! <br><br> Your Order for " + productName +  " will be delivered on  <br> <br>" + deliveryDate // html body
            });
    
            return "success";
          }
    
       
    
};