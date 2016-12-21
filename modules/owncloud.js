var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    request           = require('request'),
    session       	  = require('express-session'),
    MongoStore        = require('connect-mongo')(session);
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser')

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
var endUrl = '@eureka.fi.itb.ac.id/simpan/ocs/v1.php/cloud/';

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
  res.redirect(fullUrl)
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

exports.deleteFromGroup = function(req, res){
  let params1 = req.params.user
  let params2 = req.body.groupid
  /*
    not working, specify groupid into req.body then request({})
  */
  let fullUrl = full+'users/'+params1+'/groups'
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
