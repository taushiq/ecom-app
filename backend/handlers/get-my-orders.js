const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 
    
    const userId = req.query.userId;
    

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('select p.id as productId,  o.id as orderId, o.quantity, p.title, p.image, o.order_status, o.delivery_date, o.delivered_date from order_details o join products p on o.product_id = p.id where user_id = ? order by o.id desc',
        [parseInt(userId)],
        (err, rows) => {
            if (err) {
                conn.end();
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                conn.end();
                resp.json({
                    statusCode: "200",
                    data: rows,
                })
            }
                

        });
    
};