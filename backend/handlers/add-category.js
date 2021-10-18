const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    catImage = req.query.catImage;
    catName = req.query.catName;


    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('insert into categories ( title , image ) values ( ? , ? ) ',
        [catName, catImage],
        (err, rows) => {
            conn.end();
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
                })
            
            }
                

        });

       
    
};