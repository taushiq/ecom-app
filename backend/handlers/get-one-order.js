const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = function (req, resp) {
    // req.params --> URI segments, req.query --> query parameters
    // resp.send(req.query); 

    // const page = req.query.page || 1;
    // const limit = req.query.limit || 10;
    // const skip = (page - 1) * limit;
    const sql = 'select o.id, p.title as name, p.description, p.price, u.username from orders_details as od join orders as o' +
    ' on od.order_id = o.id join products p ' + 
    'on od.product_id = p.id join users u ' + 
    'on o.user_id = u.id where o.id = ' + req.params.oid + ' order by o.id';

    const conn = mysql.createConnection(mysqlCfg);
    conn.query(sql,
        (err, rows) => {
            if(err){
                resp.json({
                    statusCode:"500"
                })
            }
            
            conn.query('select count(*) as count from orders_details', 
                (err, result)=>{
                    if(err){
                        resp.json({
                            statusCode:"500"
                        })
                    }

                    resp.json({
                        data: rows,
                        count: result[0].count
                    })

                });

                conn.end();

        });
    
};