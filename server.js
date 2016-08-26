var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send("Dag Wereld");
});

app.listen(8080, function() {
    console.log("example listening on port 8080");
});