var express             = require('express')
var app                 = express()
var session       	    = require('express-session');
var MongoStore          = require('connect-mongo')(session);
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

var router              = express.Router()

// middleware auth
var user                = require('../modules/user')
var participants   			= require('./participants')

function isLoggedIn(req,res,next){
    if(!req.session.user){
      console.log('unauthorized access!')
      res.send('unauthorized access!')
    } else {
      next();
    }
  }

router.get('/', function(req, res){
  res.render('admin/main', {title:"Main Page Administrator"})
})

router.get('/login', function(req, res){
  res.render('admin/login', {title:"Login Admin"})
})

router.get('/home', function(req, res){
  // check if session okay
  res.render('admin/home', {title:"Dashboard admin"})
})

module.exports = router;
