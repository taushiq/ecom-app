const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 
    
    const orderId = req.query.orderId;
    const userId = req.query.userId;
    const quantity = req.query.quantity;
    const productId = req.query.productId;
    const email = req.query.email;
    

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });

      conn.query('insert into cancelled_orders(product_id, quantity, user_id, order_id) values (? , ? , ?, ?)',
      [parseInt(productId), parseInt(quantity), parseInt(userId), parseInt(orderId)],
      (err, rows) => {
          if (err) {
              console.log(err);
              resp.json({
                  statusCode: "500",
                  message: "Something went wrong",
              })
          }else{
            conn.query('delete from order_details where id = ?',
            [parseInt(orderId)],
            (err, rows) => {
                if (err) {
                    
                    resp.json({
                        statusCode: "500",
                        message: "Something went wrong",
                    })
                }else{
                    sendEmail();
                    sendEmailtoAdmin();
                    resp.json({
                        statusCode: "200",
                        message: "success",
                    })
                }
                    conn.end();
    
        });
          }

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
        subject: "Ecommerce App Order Cancelled", // Subject line
        text: "Your Order has been cancelled!", // plain text body
        html: "<h1>Greetings from Ecommerce App! Your Order Id  - " + orderId + " has been <b>cancelled</b> <br> </h1><br><h2>Please check My orders section for all the order updates.</h2>", // html body
    });

    return "success";
  }


  async function sendEmailtoAdmin() {
    
    
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
        to: 'taushiqawais@gmail.com', // list of receivers
        subject: "Order Cancel", // Subject line
        text: "Customer Cancelled Order", // plain text body
        html: "<h1>Customer cancelled the order </h1><br> <h2> Order Id - " + orderId + "<h2>" // html body
    });

    return "success";
  }

    
    
};