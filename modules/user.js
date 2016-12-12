var express         = require('express')
var app             = express()
var session       	= require('express-session');
var MongoStore      = require('connect-mongo')(session);
var cookieParser    = require('cookie-parser');
app.use(cookieParser());

// models
var Participant     = require('../models/participant')

exports.findUserByEmail = function(req,res){
  var params = req.params.email;
  Participant.findOne({email: params}, function(e,s){
    if(s){
      res.send(s)
    } else {
      res.send('not found')
    }
  })
}

exports.findAll = function(req,res){
  Participant.find({}, function(e,s){
    if(s){
      res.send(s)
    } else {
      res.send('none')
    }
  })
}

exports.deleteByEmail = function(req,res){
  var params = req.params.email;
  Participant.remove({email:params}, function(e,s){
    if(s){
      res.json({
        "Status":"OK",
        "Message":"Removed"
      })
    } else {
      res.send('error when removing')
    }
  })
}
