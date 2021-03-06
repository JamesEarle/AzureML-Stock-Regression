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

app.post('/submit', function (req, res) {
	let result = av.makeRequest(req.body.symbol.toUpperCase());

	result.then(body => {
		let obj = av.getTodaysValues(JSON.parse(body["result"]));
		let symbol = body["symbol"];
		let date = obj["date"];
		let vals = aml.makeRequest(obj["vals"]);

		vals.then(body => {
			body = JSON.parse(body)["Results"]["output1"][0];

			eval = Math.abs(body["Scored Label Mean"] - body["close"]) < body["Scored Label Standard Deviation"];
			eval = eval ? "Yes" : "No";

			res.render('index', {
				open: body["open"],
				high: body["high"],
				low: body["low"],
				close: body["close"],
				volume: body["volume"],
				slm: body["Scored Label Mean"],
				slsd: body["Scored Label Standard Deviation"],
				eval: eval,
				symbol: symbol,
				date: date
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
