var express         = require('express')
var app             = express()
var session       	= require('express-session');
var MongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var cookieParser    = require('cookie-parser');
app.use(cookieParser());

// models
var Participant     = require('../models/participant')

exports.loginAdmin = function(req,res){
  var user = req.body.username;
  var pass = req.body.password
  if(user === 'wildan' && pass === 'wildan123'){
    req.session.user = user;
    res.format({
      json: function(){
        res.send({message: 'Logged in'})
      },
      html: function(){
        res.redirect('../../admin/home')
      }
    })
  } else if (user !== 'wildan' && pass == 'wildan123') {
    console.log('wrong username')
    res.send('wrong username')
  } else if (user === 'wildan' && pass !== 'wildan123') {
    console.log('wrong password')
    res.send('wrong password')
  } else if (user !== 'wildan' && pass !== 'wildan123') {
    console.log('wrong username and password')
    res.send('wrong username and password')
  } else {
    console.log('please try again')
    res.send('please try again')
  }
}

exports.logoutAdmin = function(req,res){
  delete req.session.user;
  console.log('logged out successfully')
  res.format({
    json: function(){
      res.send({message:"Logged out"})
    },
    html: function(){
      res.redirect('../../admin')
    }
  })
}

exports.createUser = function(req,res){
  var user = new Participant()
  user.email    = req.body.email
  user.password = req.body.password
  Participant.findOne({email: user.email}, function(err, exist){
    if(exist){
      console.log('email exist!')
      res.json({
        "Status":"Error",
        "Message":"Email exist!"
      })
      return err;
    } else {
      user.save(function(err){
        if(err){
          res.send(err)
        }
        else {
          res.redirect('../../')
        }
      })
    }
  })
}

exports.updateUserByEmail = function(req,res){
  var params = req.params.email
  Participant.findOne({email: params}, function(err, user){
    if(err){
      res.json({'message':'no user found'})
    } else {
      user.email = req.body.email
      user.save(function(err){
        if(err){
          res.send(err)
        }
        res.format({
          json: function(){
            res.send({message: 'Participant updated! New email : ' + user.email})
          },
          html: function(){
            res.send('updated')
          }
        })
      })
    }
  })
}

exports.findUserByEmail = function(req,res){
  var params = req.params.email;
  Participant.findOne({email: params}, function(e,s){
    if(s){
      res.send(s)
    } else {
      res.sendStatus(404)
    }
  })
}

exports.findAll = function(req,res){
  Participant.find({}, function(e,users){
    if(users){
      res.format({
        json: function(){
          res.send(users)
        },
        html: function(){
          res.render('admin/list', {title:"List users", users:users})
        }
      })
    } else {
      res.send('none')
    }
  })
}

exports.deleteUserByEmail = function(req,res){
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
