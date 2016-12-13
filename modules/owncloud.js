var express         = require('express')
var app             = express()
var session       	= require('express-session');
var MongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var cookieParser    = require('cookie-parser');
app.use(cookieParser());

var credentials = require('../credentials/auth.json')

// url
var preUrl = 'http://';
var endUrl = '@eureka.fi.itb.ac.id/simpan/ocs/v1.php/cloud/';

// credentials
var credentials = require('../credentials/auth.json');
var credents = credentials.username+':'+credentials.password;

exports.getAllUsers = function(req,res){
  var fullUrl = preUrl+credents+endUrl+'users'
  res.redirect(fullUrl)
}

exports.getSingleUser = function(req,res){
  var params = req.params.user;
  var fullUrl = preUrl+credents+endUrl+'users/'+params
  res.redirect(fullUrl)
}

exports.getGroup = function(req,res){
  var params = req.params.user;
  var fullUrl = preUrl+credents+endUrl+'users/'+params+'/groups'
  res.redirect(fullUrl)
}
