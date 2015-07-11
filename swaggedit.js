var express = require('express');
var open = require('open');
var app = express();



module.exports = function(specFile){

    var swaggerSpecObj = require(process.cwd() + '/' + specFile);

    app.use(express.static('public'));
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('swaggEdit available at http://localhost:%s', port);
        open('http://localhost:'+port);
    });




};