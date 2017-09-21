var body = require('body-parser');
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// Allow requests to parse request body info
app.use(express.bodyParser());

// Make necessary parameters visible to 
app.use(function (req, res, next) {
    next();
});

// all environments
app.set('port', process.env.PORT || 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {

});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});