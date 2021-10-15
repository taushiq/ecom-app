const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {

    const catId = req.query.categoryId; 

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query("delete from products where cat_id = ?",
        [catId],
        (err, rows) => {
            if (err) {
                conn.end();
                console.log(err);
                resp.json({
                    statusCode: "203",
                    message: "Orders present for this category",
                })
            }else{
                conn.query("delete from categories where id = ?", [catId], (err, row1)=>{
                    if (err) {
                        conn.end();
                        console.log(err);
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
            }
            
            

                

        });
    
};