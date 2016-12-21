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
  res.render('admin/main', {title:"Main Page Administrator"})
})

router.get('/login', function(req, res){
  res.render('admin/login', {title:"Login Admin"})
})

module.exports = router;
