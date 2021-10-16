const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    product = req.body;
    


    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('insert into products(title,image,images,description,long_description, price, quantity, short_desc, cat_id , `lock` ) values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
        [product.title, product.image, product.images, product.description, product.long_description, product.price, product.quantity, product.short_desc, product.cat_id, product.lock],
        (err, rows) => {
            if (err) {
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                        
                resp.json({
                    statusCode: "200",
                    message: "success",
                })
            
            }
                

        });

       
    
};