
var common  = require('./common.js')
var config  = common.config
var mongo   = common.mongo

var util    = common.util
var uuid    = common.uuid
var oauth   = common.oauth
var url     = common.url
var request = common.request
var bodyParser = common.bodyParser;
var multer = common.multer;
var express = common.express;
var fs = common.fs

var bodyParser = require('body-parser');
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var app = express();
var fs = require('fs');


app.use(function (req, res, next) {// for giving required access
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


function err400(res,why) {
  return function(details) {
    util.debug('ERROR 400 '+why+' '+details)
    res.writeHead(400,''+why)
    res.end(''+details)
  }
}
var db     = null
var app = null

mongo.init(// initing monggo with accessing mongo username, pwd, port,host
  {
    name:     config.mongohq.name,
    host:     config.mongohq.host,
    port:     config.mongohq.port,
    username: config.mongohq.username,
    password: config.mongohq.password,
  }, 
  function(res){
    db = res
    var prefix = '/lifestream/api/user/'
    app = express()
    // Configuration
    app.use(bodyParser.urlencoded({extended: true}));// data format of get and post method
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer({ dest: './uploads' });
    
   app.post('/search/:id', function (req, res, next) {// get method to receive request
        // db.collection('mongodb_vehicle').find().toArray(function (err, db) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
//        console.log("true");
        var titleid = req.params.id;
        console.log(titleid);
        db.collection('mongodb_vehicle').find({'titleid': titleid}).toArray(function (err, db) {// search query to select database items of requested cow id
            res.send({result: true, 'msg': 'data retrieved', data: db});// sending request as a db
            console.log(db);
        });     
    });

    app.post('/users', function (req, res, next) {//post method to retrieve the requested items
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        var params = req.body.logs;// storing requested logs in params variable
        console.log(req.body.logs);
        db.collection('mongodb_vehicle').insertMany(params, function (err, result) {// query to insert the requested items into mongodb
            assert.equal(err, null);
            console.log("Inserted a document into the log collection in Mongo.");
            fs.appendFile('logs/logs.dat', JSON.stringify(params), function (err) {// append the requested items in log.dat
                if (err)
                    console.error(err);
                    console.log('Logs added to log.dat file!'+JSON.stringify(params));
            });
        });
        res.send({result: true, 'msg': 'data stored'});
    })


    
    app.listen(3009)
    util.debug('Server listening on port 3009')
  },
  function(err){
    util.debug(err)
  }
)


