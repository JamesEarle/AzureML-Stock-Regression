var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var av = require('./modules/av-request')
var aml = require('./modules/aml-request')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.render('index');
});

app.post('/submit', function(req, res) {
	let result = av.makeRequest(req.body.symbol.toUpperCase());
	result.then(body => {
		let vals = av.getTodaysValues(JSON.parse(body));
		vals = aml.makeRequest(vals);
		
		vals.then(body => {
			res.render('index', {
				body: JSON.stringify(body)
			});
		});
	});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
