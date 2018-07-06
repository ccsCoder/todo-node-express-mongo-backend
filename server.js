//----------------------------------------

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//----------------------------------------
// APP-CONFIG
//----------------------------------------
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 7702;
let password = 'Cr1ms0n';
let username = 'ccscoder';


// const mongoURL = 'mongodb://ccsCoder:vogJ1wVzjjFmlnul@'+
// 'ne0cluster-shard-00-00-wmxki.mongodb.net:27017,'+
// 'ne0cluster-shard-00-01-wmxki.mongodb.net:27017,'+
// 'ne0cluster-shard-00-02-wmxki.mongodb.net:27017/test'+
// '?ssl=true&replicaSet=ne0cluster-shard-0&authSource=admin'
// ;

const mongoURL = `mongodb://${username}:${password}@ds115420.mlab.com:15420/todos`;

mongoose.connect(mongoURL, { useNewUrlParser: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', ()=>console.log('Connected!'));


//ROUTES
let router = express.Router();

//TEST ROUTE
router.get('/ping', (req, res)=> {
    res.json({message: `Ping Received on ${port}`});
});

//register routes
app.use('/todoapi/v1/', router);

//start server
app.listen(port);
console.log(`Listening on ${port}`);


