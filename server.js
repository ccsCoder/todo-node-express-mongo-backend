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

mongoose.Promise = global.Promise;

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


