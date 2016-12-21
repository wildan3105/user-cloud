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
      res.send('unauthorized access! please login first')
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

router.get('/home', isLoggedIn, function(req, res){
  res.render('admin/home', {title:"Dashboard admin"})
})

module.exports = router;
