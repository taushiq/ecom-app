const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const catId = '%' + req.params.categoryId + '%'; 

    const conn = mysql.createConnection(mysqlCfg);
    conn.on('error', function(err) {
        resp.json({
            statusCode: "500",
            message: "Something went wrong",
        })
      });
    conn.query("select c.title as category, p.title as name, p.description, p.price, p.quantity, p.image, p.id from products p join categories c on c.id = p.cat_id where c.id like ? order by id limit ? offset ? ",
        [catId, parseInt(limit), skip],
        (err, rows) => {
            if (err) {
                resp.json({
                    statusCode: "500",
                    message: "Something went wrong",
                })
            }else{
                conn.query('select count(*) as count from products p join categories c on c.id = p.cat_id where c.id like ?  ', [catId], 
                (err, result)=>{
                    if(err) {
                        resp.json({
                            statusCode: "500",
                            message: "Something went wrong",
                        })
                    }else{
                        resp.json({
                            statusCode: "200",
                            data: rows,
                            count: result[0].count
                        })
                    }
                });
            }
            
            

                conn.end();

        });
    
};