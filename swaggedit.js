var express = require('express');
var open = require('open');
var fs = require('fs');
var app = express();



module.exports = function(specFile){

    var PATH = process.cwd() + '/' + specFile;

    var fileExists = fs.existsSync(process.cwd() + '/' + specFile);
    if(!fileExists){
        console.log("File not found at given path. Creating one...");
        fs.writeFileSync(PATH, '{}');
    }

    var swaggerSpecObj = require(process.cwd() + '/' + specFile);

    app.use(express.static('public'));
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.get('/spec', function(req, res){
        res.json(swaggerSpecObj);
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('swaggEdit available at http://localhost:%s', port);
        open('http://localhost:'+port);
    });




};