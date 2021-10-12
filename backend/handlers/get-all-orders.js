const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    // const page = req.query.page || 1;
    // const limit = req.query.limit || 10;
    // const skip = (page - 1) * limit;

    const userId = req.query.user;
    const sql = 'select od.id, p.title as productName, p.description, p.price, u.username from order_details od ' +
    'join products p ' + 
    'on od.product_id = p.id join users u ' + 
    'on od.user_id = u.id where u.id = ' + userId + ' order by od.id';

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query(sql,
        (err, rows) => {
            if (err) {
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                resp.json({
                    statusCode: "200",
                    data: rows,
                    count: rows.length
                })
            }
                conn.end();

        });
    
};