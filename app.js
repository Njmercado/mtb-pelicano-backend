var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const chargeRouter = require('./routes/charge')
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

var app = express();

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}))

//Routes
app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/charge', chargeRouter);

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
});

module.exports = app;

// "dev": "DEBUG=adminapp:* npm start"