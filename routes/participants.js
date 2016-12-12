var express         = require('express')
var app             = express()
var session       	= require('express-session');
var MongoStore      = require('connect-mongo')(session);
var cookieParser    = require('cookie-parser');
app.use(cookieParser());

// models
var Participant     = require('../models/participant')
var router          = express.Router()

// modules
var user           = require('../modules/user')

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

// test handler
router.get('/test', isLoggedIn, function(req,res){
  res.send('testing')
})

router.post('/login', function(req,res){
  var user = req.body.username;
  var pass = req.body.password
  if(user === 'wildan' && pass === 'wildan123'){
    req.session.user = user;
    res.send('logged in')
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
})

router.post('/logout', function(req, res){
  delete req.session.user;
  console.log('logged out successfully')
  res.send('logged out');
})

// router to check session
router.get('/check_session', function(req,res){
  if (req.session.user = 'undefined'){
    console.log('please login')
    res.send('please login')
  } else if(req.session.user == 'wildan') {
    console.log('your session is ', req.session.user)
    res.send('your session is ', req.session.user)
  }
})

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

// list of functions

router.use(isLoggedIn)
router.get('/participants', user.findAll)
router.get('/participant/:email', user.findUserByEmail)
router.delete('/participant/:email', user.deleteByEmail)

router.route('/participants')
  // post single participant
  .post(function(req,res){
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
            res.format({
              json: function(){
                res.send({
                  "Status":"OK",
                  "Message":"Participant created"
                })
              },
              html: function(){
                res.send("OK")
              }
            })
          }
        })
      }
    })
  })

router.route('/participant/:email')
// update single participant
.put(function(req, res){
  Participant.findOne({email: req.params.email}, function(err, user){
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
})

module.exports = router;
