var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    request           = require('request'),
    session       	  = require('express-session'),
    MongoStore        = require('connect-mongo')(session);

app.use(cookieParser());

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

exports.getGroup = function(req,res){
  let params = req.params.user;
  let fullUrl = full+'users/'+params+'/groups'
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
  var user = req.body.username;
  var pass = req.body.password;
  var full = full+'users'
  var formData = {
    userid: user,
    password: pass
  }
  request({url: full, form: {userid:'abc', password:'wildan123'}}, function(err, response, body){
    if(!err && response.statusCode == 200){
      res.send(body)
    }
  })
}
