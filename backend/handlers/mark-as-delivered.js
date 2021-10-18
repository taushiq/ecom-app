const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = function (req, resp) {

    orderId = req.query.orderId;
    productName = req.query.productName;
    email = req.query.email;
    const newDate = new Date();
    const monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    deliveredDate = newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear();

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('update order_details set delivered_date = ? , order_status = "Delivered" where id = ?', [ deliveredDate, orderId ],
        (err, rows) => {
            if (err) {
                conn.end();
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                
                sendEmail();
                conn.end();
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
                subject: "Order Delivered", // Subject line
                text: "Your Order has been delivered", // plain text body
                html: "<h1>Greetings from Ecommerce App! <br><br> Your Order for " + productName +  " has been delivered on  <br> <br>" + deliveryDate // html body
            });
    
            return "success";
          }
    
       
    
};