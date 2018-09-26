//----------------------------------------

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

/**
 * ROUTES
 */

const router = require('./src/routes/routes.js');

//----------------------------------------
// APP-CONFIG
//----------------------------------------

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

mongoose.Promise = global.Promise;

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 7702;
let password = 'Cr1ms0n';
let username = 'ccscoder';

const mongoURL = `mongodb://${username}:${password}@ds115420.mlab.com:15420/todos`;

mongoose.connect(mongoURL, { useNewUrlParser: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', ()=>console.log('Connected!'));


//register routes
app.use('/todoapi/v1/', router);

//start server
app.listen(port);
console.log(`Listening on ${port}`);


