var express             = require('express')
var app                 = express()
var session       	    = require('express-session');
var MongoStore          = require('connect-mongo')(session);
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.disable('x-powered-by')

// models
var Participant         = require('../models/participant')
var router              = express.Router()

// modules
var user                = require('../modules/user')
var owncloud            = require('../modules/owncloud')

// owncloud
var preUrl = 'http://',
    endUrl = '@eureka.fi.itb.ac.id/ocs/v1.php/cloud/';
var credentials = require('../credentials/auth.json')
var credents = credentials.username+':'+credentials.password

router.use(session({
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost:27017/usercloud'})
  })
);

// set header


// middleware to use in all routes
router.use(function(req, res, next){
  console.log('%s %s [%s]', req.method, req.url, res.statusCode.toString())
  next() // go to next route and not stop here
})

// error handling
router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// testing
var requestTime = function(req, res, next){
  req.requestTime = new Date()
  next()
}

router.get('/testing', requestTime, function(req,res){
  res.set({
    'Authorization':'wildan123'
  })
  var responseText = 'Hello world';
  let times = new Date()
  responseText += 'requested at ' + req.requestTime
  console.log(times)
  res.sendStatus(403)
})

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

// type of session
// function isLoggedIn(type){
//   return function(req, res, next){
//     if (!req.user || req.user.type != type){
//       return next(new Error ('Unauthorized'));
//     }
//     next();
//   }
// }
//
// router.get('/admin', isLoggedIn('admin'), adminController)

router.get('/', function(req,res, next){
  res.json({
    'message': 'Welcome to userCloud API',
    'features': 'GET, POST, PUT, DELETE'
  })
})

router.post('/login', user.loginAdmin)
router.post('/logout', user.logoutAdmin)

// check session for all routes below
router.use(isLoggedIn)

router.get('/participants', user.findAll)

router.post('/participant', user.createUser)
router.get('/participant/:email', user.findUserByEmail)
router.delete('/participant/:email', user.deleteUserByEmail)
router.put('/participant/:email', user.updateUserByEmail)

// owncloud
router.get('/owncloud/users', owncloud.getAllUsers)
router.get('/owncloud/users/:user', owncloud.getSingleUser)
router.delete('/owncloud/users/:user', owncloud.deleteUser)
router.get('/owncloud/users/:user/groups', owncloud.getGroup)
//router.delete('/owncloud/users/:user/groups', owncloud.deleteFromGroup)
router.delete('/owncloud/groups/:group', owncloud.deleteGroup)
router.get('/owncloud/users/:user/subadmins', owncloud.getSubadmin)
router.get('/owncloud/groups', owncloud.getAllGroups)
router.get('/owncloud/groups/:group', owncloud.getGroupMember)

router.get('/owncloud/test', owncloud.Test)
router.post('/owncloud/users', owncloud.addUser)

module.exports = router;
