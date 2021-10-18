const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('select * from categories ',

        (err, rows) => {
            conn.end()
            if (err) {
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                conn.end(); 
                resp.json({
                    statusCode: "200",
                    message: "success",
                    data: rows
                })
            
            }
                

        });

       
    
};