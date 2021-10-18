const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    let productId = req.params.prodId;

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('select c.title as category, p.title as name, p.price,p.description,p.long_description, p.quantity, p.image, p.images , p.id from products p join categories c on c.id = p.cat_id where p.id = ? ',
        [parseInt(productId)],
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