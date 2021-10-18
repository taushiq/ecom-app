const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

// secret key to be maintained only on the server side, and must be a very complex string
const secretKey = require('../secret.key');

module.exports = (req, resp) => {
    // check if payload contains email/password (in md5 format) fields
    if ('email' in req.body && 'password' in req.body) {
        const sql = 'select * from users where type = "admin" and email= "' + req.body.email + '" and password= "' + req.body.password + '"';
        const data = [req.body.email, req.body.password];
        const conn = mysql.createConnection(mysqlCfg);
        conn.query(sql, data, (err, results) => {
            
            if (err){
                conn.end();
                resp.json({
                    status:500,
                    message: "something_went_wrong"
                });
            }else{
                const isValidUser = (results.length === 1);

                if (isValidUser) {
                    // if valid, then generate a JWT and send as response body
                    let user = results[0];
    
                    const payload = {
                        sub: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        iat: Date.now()
                    };
    
                    const token = jwt.sign(payload, secretKey);
                    resp.json({ token });
                }
                else {
                    // if invalid, then respond with HTTP status code 401
                    resp.status(401);
                    resp.json({ message: 'Invalid email/password combination!' });
                }
                conn.end();
            }

            
        });
    }
    else {
        resp.status(400); // bad input
        resp.send({ message: 'email and password are required in json format' });
    }
}