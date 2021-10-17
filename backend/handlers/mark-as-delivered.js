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
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('update order_details set delivered_date = ? , order_status = "Delivered" where id = ?', [ deliveredDate, orderId ],
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
                subject: "Order Delivered", // Subject line
                text: "Your Order has been delivered", // plain text body
                html: "<h1>Greetings from Ecommerce App! <br><br> Your Order for " + productName +  " has been delivered on  <br> <br>" + deliveryDate // html body
            });
    
            return "success";
          }
    
       
    
};