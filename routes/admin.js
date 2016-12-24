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

// outer module
var user             = require('../modules/user')
var admin            = require('../modules/admin')

// middleware auth
router.use(session({
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost:27017/usercloud'})
  })
);

function isLoggedIn(req,res,next){
    if(!req.session.user){
      console.log('unauthorized access!')
      res.format({
        json: function(){
          res.send({message:" unauthorized access! please login first"})
        },
        html: function(){
          res.redirect('../admin')
        }
      })
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

router.post('/login', user.loginAdmin)
router.post('/logout', user.logoutAdmin)

router.use(isLoggedIn)

router.get('/home', function(req, res){
  res.render('admin/home', {title:"Dashboard admin"})
})

router.get('/profile', function(req, res){
  res.render('admin/profile', {title:"Admin profile"})
})

router.get('/owncloud', admin.getAllUsers)

router.get('/list', user.findAll)

router.get('/list/:email', user.findUserByEmail)

router.get('/list/:email/delete', user.deleteUserByEmail)

module.exports = router;
