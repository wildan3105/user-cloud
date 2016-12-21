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

router.get('/', function(req, res){
  res.render('user/main', {title:"Main page"})
})

router.get('/register', function(req, res){
  res.render('user/register', {title: "Registration page"})
})

module.exports = router;
