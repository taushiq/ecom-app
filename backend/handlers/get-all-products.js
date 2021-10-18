const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        conn.end();
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query('select c.title as category, p.description ,p.title as name, p.price, p.quantity, p.image, p.id from products p join categories c on c.id = p.cat_id order by id limit ? offset ? ',
        [parseInt(limit), skip],
        (err, rows) => {
            if (err) {
                conn.end();
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                conn.query('select count(*) as count from products', 
                (err, result)=>{
                    if(err) {
                        conn.end();
                        resp.json({
                            statusCode: "500",
                            message: "Something went wrong",
                        })
                    }else{
                        
                        conn.query('select * from categories',
                        (err, catResult)=>{
                            if(err) {
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
                                    count: result[0].count,
                                    categories: catResult
                                })
                            }
                        })


                        
                    }             
                });
            
            }
                

        });

       
    
};