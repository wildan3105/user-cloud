var express = require('express')
var app = express()

app.get('/', function(req,res){
	res.send('user cloud homepage')
})

app.listen(4500, function(){
	console.log('app listening on 4500')
})
