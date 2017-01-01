var express = require('express');
var app = express();
var parse = require('./parseDates');

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/indexExpr.html');
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://preview.c9users.io');
    next(); 
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://heroku-timestamp-microservice.herokuapp.com/');
    next(); 
});

app.get('/:datumType', function(request, response) {
    var date = request.params.datumType;
	var datum = parse.createDates(date);
	response.send(datum);       
});

app.listen(process.env.PORT || 8000, process.env.IP, function(){
    console.log("er gebeurt wat");
});