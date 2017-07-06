var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use cookie-parser and express-session
app.use(cookieParser());
app.use(session({
	resave:true,
	saveUninitialized:false,
	secret:'love'
}));

// login router
app.use(function(req,res,next){
	if(!req.session.user){
		if(req.url == '/login.html'){
			console.log("===---"+req.url);
			next();
		}else if(req.url == "/logincheck.html"){
			next();
		}else if(req.url == "/loginto.html"){
			next();
		} else{
			console.log("即将跳转")
			res.redirect('/login.html');
		}
	} else{
		next();
	}
	console.log("---the session is:"+req.session.user);
})
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//

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
