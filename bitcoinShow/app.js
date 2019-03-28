var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')

var indexRouter = require('./app/routes/index');


var app = express();
app.listen(3000, function () {
	  console.log('Revision app listening on port 3000!');
	});
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/test')
console.log('mongodb connnected!')
// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	  secret: 'workhard',
	  resave: false,
	  saveUninitialized: false
	}));
app.use('/', indexRouter);

//use sessions for tracking logins


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
