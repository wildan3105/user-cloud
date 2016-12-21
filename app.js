var express = require('express');
var app = express();
var bodyParser      		= require('body-parser');
var cookieParser    		= require('cookie-parser');
var mongoose        		= require('mongoose');
var methodOverride  		= require('method-override');
var http            		= require('http');
var port            		= process.env.PORT || 4500;
var session							= require('express-session');
var MongoStore    			= require('connect-mongo')(session);
var helmet							= require('helmet');
var Participant    			= require('./models/participant');
var participants   			= require('./routes/participants');
var main								= require('./routes/main');
var admin								= require('./routes/admin');
var cons								= require('consolidate');
var path								= require('path')

mongoose.connect('mongodb://127.0.0.1:27017/usercloud');

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.use('/api', participants);
app.use('/', main);
app.use('/admin', admin);

app.listen(port);
console.log('Server running at ', port);
