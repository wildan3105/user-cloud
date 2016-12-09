var express = require('express')
var app = express()
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');
var http            = require('http');
var session       	= require('express-session');
var port            = process.env.PORT || 4500;
var MongoStore    = require('connect-mongo')(session);
var Participant    = require('./models/participant');
var participants   = require('./routes/participants');

mongoose.connect('mongodb://127.0.0.1:27017/usercloud');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('views', './views');
app.use('/api', participants);

app.use(session({
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb://localhost:27017/usercloud'})
  })
);

app.get('/', function(req,res){
	res.send('user cloud homepage')
})

app.listen(port);
console.log('Server running at ', port);
