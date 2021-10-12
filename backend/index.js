//npm install mysql nodemon express body-parser jsonwebtoken cors


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const cors = require('./middlewares/cors');

const app = express(); // const server = http.createServer(callback);
const port = 3000;

// register bodyParser middleware with express
app.use(bodyParser.json());

// register a middleware, which enables CORS
app.use(cors());

// REST endpoint for sign up initial
app.post('/warehouse/signup', require('./handlers/signup-initial'));

// REST endpoint for sign up Final
app.post('/warehouse/signupfinal', require('./handlers/signup-final'));


// REST endpoint to check the login credentials
app.post('/warehouse/login', require('./handlers/login'));

// REST endpoint to check the adminlogin credentials
app.post('/warehouse/adminlogin', require('./handlers/admin-login'));

//to get a specific product with the help of the product ID

//to get all the products of a particular Category
app.get('/warehouse/category/:categoryId', require('./handlers/get-all-products-by-category'));

//to get all the products
app.get('/warehouse', require('./handlers/get-all-products'));

//cancel order
app.get('/warehouse/myorders/cancel', require('./handlers/cancel-order'));

app.get('/warehouse/myorders', require('./handlers/get-my-orders'));

app.get('/warehouse/:prodId', require('./handlers/get-one-product'));
// middleware to check if the request contains JWT token in the form of a header, and 
// allow the user to access any routes, only if the JWT is present and not-tampered
app.use(require('./middlewares/auth'));


//to get all the order details
app.get('/warehouse/orders', require('./handlers/get-all-orders'));

//to fetch my orders

//place an order
app.post('/warehouse/orders/new',require('./handlers/place-one-order'))

//to get all the order details
app.get('/warehouse/orders/:oid', require('./handlers/get-one-order'));




// app.get('/warehouse/aes', require('./handlers/aes'));


//app.listen(port, function () { console.log(`server started at port ${port}`); });
app.listen(process.env.PORT || 3000, function () { console.log(`server started at port ${port}`); });