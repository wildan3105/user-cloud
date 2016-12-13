var express             = require('express')
var app                 = express()
var session       	    = require('express-session');
var MongoStore          = require('connect-mongo')(session);
var cookieParser        = require('cookie-parser');
app.use(cookieParser());

// models
var Participant         = require('../models/participant')
var router              = express.Router()

// modules
var user                = require('../modules/user')

router.use(session({
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost:27017/usercloud'})
  })
);

// middleware
var auth = require('../middleware/auth')

function isLoggedIn(req,res,next){
  if(!req.session.user){
    console.log('unauthorized access!')
    res.send('unauthorized access! please login first')
  } else {
    next();
  }
}

router.use(function(req, res, next){
  console.log('%s %s [%s]', req.method, req.url, res.statusCode.toString())
  next() // go to next route and not stop here
})

router.get('/', function(req,res, next){
  res.json({
    'message': 'Welcome to userCloud API',
    'features': 'GET, POST, PUT, DELETE'
  })
})

// test handler
router.get('/test', isLoggedIn, function(req,res){
  res.send('testing')
})

router.post('/login', user.loginAdmin)
router.post('/logout', user.logoutAdmin)

router.use(isLoggedIn)

router.get('/participants', user.findAll)

router.post('/participant', user.createUser)
router.get('/participant/:email', user.findUserByEmail)
router.delete('/participant/:email', user.deleteUserByEmail)
router.put('/participant/:email', user.updateUserByEmail)

module.exports = router;
