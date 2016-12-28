var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    request           = require('request'),
    session       	  = require('express-session'),
    MongoStore        = require('connect-mongo')(session);
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser')
var parseString       = require('xml2js').parseString;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// specific parsing
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlEncodedParser = bodyParser.urlencoded({extended: false})

var credentials = require('../credentials/auth.json')

// url
var preUrl = 'http://';
var endUrl = '@localhost:8080/owncloud/ocs/v1.php/cloud/';

// credentials
var credentials = require('../credentials/auth.json');
var credents = credentials.username+':'+credentials.password;
var full = preUrl+credents+endUrl;

// test using 'request' module

exports.getAllUsers = function(req,res){
  let fullUrl = full+'users'
  request.get(fullUrl, function(err, response, body){
    if(!err){
      // parse to json
      var users;
      parseString(body, function(err, result){
        users = result.ocs.data[0].users[0].element;
      })
      var accounts = [];
      for (var i=1; i<=users.length; i++){
        accounts.push({
          index: i,
          username: users[i]
        })
      }
      res.render('admin/n-ownclouds', {title:"Owncloud Accounts", accounts:accounts})
    }
  })
}

exports.getSingleUser = function(req,res){
  let params  = req.params.user;
  let fullUrl = full+'users/'+params
  request.get(fullUrl, function(err, response, body){
    if(!err){
      var user, quota;
      parseString(body, function(err, result){
        user    = result.ocs.data[0]
        quota  = result.ocs.data[0].quota[0]
        console.log(user)
      })
      // hardcode, still
      let free  = quota.free / 1024 / 1024 / 1024,
          used  = quota.used / 1024 / 1024 / 1024,
          total = quota.total / 1024 / 1024 / 1024;
      free = free.toString(),
      used = used.toString(),
      total = total.toString(),
      free = free.substring(0, 6),
      used = used.substring(0, 6),
      total = total.substring(0,6)
      var details = [];
      res.render('admin/n-owncloud-detail', {title:"Owncloud user detail",
        free:free, used:used, total:total, user:user
      })
    }
  })
}

exports.deleteUserByEmail = function(req,res){
  let params  = req.params.user
  let fullUrl = full+'users/'+params
  request.get(fullUrl, function(err, response, body){
    if(!err){
      res.redirect('../../owncloud')
    }
  })
}
