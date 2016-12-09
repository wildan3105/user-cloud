var express = require('express')
var app     = express()
var Temp    = require('../models/participant')
var router  = express.Router()

router.get('/', function(req,res){
  res.json({message: 'Welcome to userCloud API'})
})

router.use(function(req, res, next){
  // console out
  console.log('something is happening')
  next() // go to next route and not stop here
})

module.exports = router;
