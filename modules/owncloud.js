var express         = require('express')
var app             = express()
var session       	= require('express-session');
var MongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var cookieParser    = require('cookie-parser');
var request         = require('request');
app.use(cookieParser());

var credentials = require('../credentials/auth.json')

// url
var preUrl = 'http://';
var endUrl = '@eureka.fi.itb.ac.id/simpan/ocs/v1.php/cloud/';

// credentials
var credentials = require('../credentials/auth.json');
var credents = credentials.username+':'+credentials.password;
var full = preUrl+credents+endUrl;

exports.getAllUsers = function(req,res){
  let fullUrl = full+'users'
  res.redirect(fullUrl)
}

exports.getSingleUser = function(req,res){
  let params = req.params.user;
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

exports.getGroupMember = function(req,res){
  let params = req.params.group
  let fullUrl = full+'groups/'+params
  res.redirect(fullUrl)
}

exports.Test = function(req,res){
  request('http://localhost:4500/api', function(err, response, body){
    if(!err && response.statusCode == 200){
      res.send(body)
    }
  })
}

exports.addUser = function(req,res){
  // var user = req.body.username;
  // var pass = req.body.password;
  var full = full+'users'
  var formData = {
    userid: 'abc',
    password: 'abc123'
  }
  request({url: full, form: {userid:'abc', password:'wildan123'}}, function(err, response, body){
    if(!err && response.statusCode == 200){
      res.send(body)
    }
  })
}
