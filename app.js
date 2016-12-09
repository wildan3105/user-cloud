var express = require('express')
var app = express()
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');
var http            = require('http');
var port            = process.env.PORT || 4500;

var Participant    = require('./models/participant');
var participants   = require('./routes/participants');

mongoose.connect('mongodb://127.0.0.1:27017/usercloud');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('views', './views');
app.use('/api', participants);

app.get('/', function(req,res){
	res.send('user cloud homepage')
})

app.listen(port);
console.log('Server running at ', port);
