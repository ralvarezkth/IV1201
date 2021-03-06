'use-strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {verifyToken, authApplicant} = require('./view/routes/authentication')

const IndexRouter = require('./view/routes/indexRouter');
const ApplyRouter = require('./view/routes/applyRouter');
const RegisterRouter = require('./view/routes/registerRouter');
const LoginRouter = require('./view/routes/loginRouter');
const ContentRouter = require('./view/routes/contentRouter');
const AdminRouter = require('./view/routes/adminRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', IndexRouter);
app.use('/admin', AdminRouter);
app.use('/apply', verifyToken, authApplicant, ApplyRouter);
app.use('/content', ContentRouter);
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);

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
