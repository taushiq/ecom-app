const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    id = req.query.id;


    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('delete from products where id = ? ',
        [id],
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
                    message: "success",
                })
            
            }
                

        });

       
    
};