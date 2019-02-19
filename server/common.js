
var util     = exports.util     = require('util')
var express  = exports.express  = require('express')
var uuid     = exports.uuid     = require('node-uuid')
var oauth    = exports.oauth    = require('oauth')
var url      = exports.url      = require('url')
var request  = exports.request  = require('request')
var fs       = exports.fs = require('fs')
var bodyParser = exports.bodyParser = require('body-parser');
var multer   = exports.multer = require('multer');
var express  = exports.express = require('express')
var MongoClient = exports.MongoClient = require("mongodb").MongoClient
var config = exports.config = require('./config.js')

// JSON functions

exports.readjson = function(req,win,fail) {
  var bodyarr = [];
  req.on('data',function(chunk){
    bodyarr.push(chunk);
  })
  req.on('end',function(){
    var bodystr = bodyarr.join('');
    util.debug('READJSON:'+req.url+':'+bodystr);
    try {
      var body = JSON.parse(bodystr);
      win && win(body);
    }
    catch(e) {
      fail && fail(e)
    }
  })
}

exports.sendjson = function(res,obj){
  res.writeHead(200,{
    'Content-Type': 'text/json',
    'Cache-Control': 'private, max-age=0'
  });
  var objstr = JSON.stringify(obj);
  util.debug('SENDJSON:'+objstr);
  res.end( objstr );
}


// mongo functions

var mongodb = require('mongodb')

var mongo = {
  mongo: mongodb,
   db: null,
  coll: null
}

var options = {
    server: {auto_reconnect: true, socketOptions: { keepAlive: 1, connectTimeoutMS: 300000, socketTimeoutMS: 0} },
    db: {native_parser:true, w:0}
}



mongo.init = function( opts, win, fail ){
//console.log(JSON.stringify(opts))
util.debug('mongo: '+opts.host+':'+opts.port+'/'+opts.name)
//MongoClient.connect("mongodb://<your_username>:<your_Password>@<your_server>.mongohq.com:<your_port>/<your_dbase>", options,
 MongoClient.connect("mongodb://mongodb_vehicle:mongodb_vehicle@ds125914.mlab.com:25914/mongodb_vehicle", options, // connecting mongodb
   function(err, db) {
     if (err) {
        util.debug('Error opening or authenticating mongohq database')
        }
     else {
        mongo.db = db
        win && win(mongo.db)

        }
     })
}

mongo.res = function( win, fail ){
  return function(err,res) {
    if( err ) {
      util.log('mongo:err:'+JSON.stringify(err));
      fail && 'function' == typeof(fail) && fail(err);
    }
    else {
      win && 'function' == typeof(win) && win(res);
    }
  }
}

mongo.open = function(win,fail){
  mongo.db.open(mongo.res(function(){
    util.log('mongo:ok');
    win && win();
  },fail))
}

mongo.coll = function(name,win,fail){
  mongo.db.collection(name,mongo.res(win,fail));
}

exports.mongo = mongo

