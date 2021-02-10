'use-strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./view/routes/index');
const usersRouter = require('./view/routes/users');

const UserController = require('./controller/UserController');
const UserDTO = require('./model/dto/UserDTO');

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch all handler, redirects to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

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
  //res.render('error'); // throws error if a view engine is not used
  res.json({ error: err});
});

/******************************
* Temporary user creation test 
*******************************/
const userController = new UserController();
const newUser = new UserDTO(null, 'richard6', 'fa', 'rich6', 'pass123', 'rich6@fake.email', '1234567896', '1612809774');

setTimeout(() => {
  registerTestUser(newUser);
}, 3000);


async function registerTestUser(user) {
  const createdUser = await userController.setUser(user);
  console.log(`registered new user with name: ${createdUser.firstName} ${createdUser.lastName}, email: ${createdUser.email}`);
}

module.exports = app;
