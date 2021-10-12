const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');
const nodemailer = require("nodemailer");

module.exports = async (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);
    // var userId = req.body.userId
    var userId = req.body.orderModel.userId;
    var orderModel = req.body.orderModel;
    var cart = req.body.cart;
    var globalQuantity;
    const email = req.body.email;
    var custEmailContent = '';
    var adminEmailContent = '';
    
    
    //Update Order_details Table autogenerate id
    //Update Products Table  --- Check if product quantity is not lesser than 0


    // const requiredFields = ['orderModel', 'cart', 'userId'];

    // const missingFields = [];

    // requiredFields.forEach((field) => {
    //     if (field in req.body === false) {
    //         missingFields.push(field);
    //     }
    // });

    // if (missingFields.length > 0) {
    //     resp.json({
    //         statusCode: "500",
    //         message: "Something went wrong",
    //     })
    //     return;
    // }

    
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });

    var orderedDetails = []

    try{

        for(var i = 0; i < cart.length; i++){
            var checkLockResult = await checkLock(cart[i].productId, cart[i].numInCart);
            if(checkLockResult){
                console.log("Lock is Open");
                var freezeLockResult = await freezeLock(cart[i].productId);
                if(freezeLockResult){
                    console.log("Lock Freezed by Us");
                    console.log(globalQuantity);
                    var updateQuantity = await updateProductQuantity(cart[i].productId, globalQuantity - cart[i].numInCart);
                    if(updateQuantity){
                        console.log("Quantity updated by us");
                        var releaseLockResult = await releaseLock(cart[i].productId);
                        if(releaseLockResult){
                            console.log("Lock released by us");
                            var insertedIntoOrderTable = await insertIntoOrderTable(cart[i].productId,cart[i].numInCart,userId);
                            if(insertedIntoOrderTable){
                                console.log("Order Table Updated");
                                custEmailContent = custEmailContent + '<h3>Product - ' + cart[i].product.name + ' , Quantity - ' + cart[i].numInCart + '</h3><br>'
                                orderedDetails.push({id: cart[i].productId, status: "success"});

                            }else{
                                console.log("Order Details Table could not be updated");
                            }
                        }else{
                            console.log("Lock could not be released by us");
                            
                        }
                    }else{
                        console.log("Quantity could not be updated by us");
                        
                    }

                }else{
                    console.log("Lock Could not be freezed by Us");
                    
                }
            }else{
                console.log("Lock is Closed");
                
            }
        }

        sendEmail();
        sendEmailtoAdmin();

        resp.json({
            statusCode: "200",
            message: orderedDetails.length == 0 ? "failed" : "success",
            orderedDetails: orderedDetails
        })

        async function checkLock(id, quantity){
            return new Promise((resolve, reject)=> {
                conn.query('select `lock`, `quantity` from products where id = ?', [id], (err, rows)=>{
                    if (err) {
                        resolve(false);
                    }else{
                        globalQuantity = rows[0].quantity;
                        if(rows[0].lock == 0 && rows[0].quantity >= quantity){   
                            resolve(true);
                        }else{  
                            resolve(false);
                        }
                    }
                });
            });
        }

        async function freezeLock(id){
            return new Promise((resolve, reject)=> {
                conn.query('update products set `lock` = true where id = ?', [id], (err, data)=>{
                    if (err) {
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                });
            });  
        }


        async function releaseLock(id){
            return new Promise((resolve, reject)=> {
                conn.query('update products set `lock` = false where id = ?', [id], (err, data)=>{
                    if (err) {
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                });
            });  
            
            
        }

        async function updateProductQuantity(id, quantity){
            return new Promise((resolve, reject)=> {
                conn.query('update products set quantity = ? where id = ?', [quantity,id], (err, data)=>{
                    if (err) {
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                });
            });  
            
        }

        async function insertIntoOrderTable(productId, quantity, userId){
            return new Promise((resolve, reject)=> {
                conn.query('insert into order_details (product_id, quantity , user_id, address_details) values (? , ? , ? , ?)', [parseInt(productId),parseInt(quantity),parseInt(userId), JSON.stringify(orderModel)], (err, rows)=>{
                    if (err) {
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                });
            });
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
                subject: "Ecommerce App Order Successful", // Subject line
                text: "Your Order is Successful!", // plain text body
                html: "<h1>Greetings from Ecommerce App! Your Order is <b> Successful</b> " + custEmailContent + " <br> </h1><br><h2>Please check My orders section for all the order updates.</h2>", // html body
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
                subject: "Ecommerce App Order Successful", // Subject line
                text: "Customer Ordered a Product", // plain text body
                html: "<h1>Customer ordered the following</h1> " + custEmailContent + "<br> <h1> Customer Details </h1> <h3>Name - " + orderModel.firstname + " " + orderModel.lastname + "</h3><br> <h3> Address - " + orderModel.address + "</h3><br><h3> Mobile - " + orderModel.mobile + "</h3>"// html body
            });
    
            return "success";
          }  
    
    

        

    }catch{
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        }) 
    }

    

    
    
    
    
    

    

    

    
    
    

    
    
    
    
    
    
};