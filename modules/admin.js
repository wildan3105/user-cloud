var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    request           = require('request'),
    session       	  = require('express-session'),
    MongoStore        = require('connect-mongo')(session);
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser')
var parseString       = require('xml2js').parseString;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// specific parsing
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlEncodedParser = bodyParser.urlencoded({extended: false})

var credentials = require('../credentials/auth.json')

// url
var preUrl = 'http://';
var endUrl = '@eureka.fi.itb.ac.id/simpan/ocs/v1.php/cloud/';

// credentials
var credentials = require('../credentials/auth.json');
var credents = credentials.username+':'+credentials.password;
var full = preUrl+credents+endUrl;

// test using 'request' module

exports.getAllUsers = function(req,res){
  let fullUrl = full+'users'
  request.get(fullUrl, function(err, response, body){
    if(!err & response.statusCode == 200){
      // parse to json
      parseString(body, function(err, result){
        console.log(JSON.stringify(result))
      })
      var data = body;
      res.render('admin/owncloud', {title:"Owncloud Accounts", data:data})
    }
  })
}
