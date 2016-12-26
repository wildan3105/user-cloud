var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    request           = require('request'),
    session       	  = require('express-session'),
    MongoStore        = require('connect-mongo')(session);
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser')
//var parser              = require('xml2json');

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
exports.Test = function(req,res){
  request('http://localhost:4500/api', function(err, response, body){
    if(!err && response.statusCode == 200){
      res.send(body)
    }
  })
}

exports.getAllUsers = function(req,res){
  let fullUrl = full+'users'
  request.get(fullUrl, function(err, response, body){
    if(!err & response.statusCode == 200){
      // parse to json
      // var data = JSON.parse(body)
      var data = body;
      res.send(body);
    }
  })
}

exports.getSingleUser = function(req,res){
  let params = req.params.user;
  let fullUrl = full+'users/'+params
  res.redirect(fullUrl)
}

exports.deleteUser = function(req, res){
  let params = req.params.user
  let fullUrl = full+'users/'+params
  res.redirect(fullUrl)
}

exports.getGroup = function(req,res){
  let params = req.params.user
  let fullUrl = full+'users/'+params+'/groups'
  res.redirect(fullUrl)
}

exports.deleteGroup = function(req, res){
  let params = req.params.group
  let fullUrl = full+'groups/'+params
  res.redirect(fullUrl)
}

exports.getSubadmin = function(req,res){
  let params = req.params.user;
  let fullUrl = full+'users/'+params+'/subadmins'
  res.redirect(fullUrl)
}

exports.getAllGroups = function(req, res){
  /*
    @param : ?search= string
    @param : ?limit= int
    @param : ?offset= int
  */
  let fullUrl = full+'groups';
  res.redirect(fullUrl)
}

exports.getGroupMember = function(req,res){
  let params = req.params.group
  let fullUrl = full+'groups/'+params
  res.redirect(fullUrl)
}

exports.addUser = function(req,res){
  let fullUrl   = full+'users'
  if (!req.body) return res.sendStatus(404)
  res.redirect(307, fullUrl+'?userid='+req.body.userid+'&password='+req.body.password)
}

exports.addUserToGroup = function(req, res){
  let params  = req.params.user
  let fullUrl = full+'users/'+params+'/groups'
  if (!req.body) return res.sendStatus(404)
  res.redirect(307, fullUrl+'?groupid='+req.body.groupid)
}

exports.addGroup = function(req, res){
  let fullUrl = full+'groups'
  if (!req.body) return res.sendStatus(404)
  res.redirect(307, fullUrl+'?groupid='+req.body.groupid)
}

exports.updateUser = function(req, res){
  /*
    @param : email, quota, display, password
  */
  let params  = req.params.user
  let fullUrl = full+'users/'+params
  var keyname = req.body.key
  switch (keyname) {
    case 'email': console.log('email')
      break;
    case 'quota': console.log('quota')
      break;
    default: console.log('default')
  }
  res.redirect(307, fullUrl+'?key='+req.body.key+'&value='+req.body.value)
}

exports.removeFromGroup = function(req, res){
  let params  = req.params.user
  let fullUrl = full+'users/'+params+'/groups'
  res.redirect(307, fullUrl+'?groupid='+req.body.groupid)
}
