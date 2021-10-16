const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    id = req.query.id;


    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('delete from products where id = ? ',
        [id],
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