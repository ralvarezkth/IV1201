const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./view/routes/index');
const usersRouter = require('./view/routes/users');

const UserController = require('./controller/UserController');
const ApplicantDTO = require('./model/dto/ApplicantDTO');
const PersonDTO = require('./model/dto/PersonDTO');


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

// running some tests below
const userController = new UserController();
userController.dbHandler.createTables();
registerTestUser();

async function registerTestUser() {
  const { person, applicant } = await userController.setUser('richard', 'fa', 'rich', 'pass123', 'rich@fake.email', '1234567890', '1612807274');
  console.log(`registered person with name: ${person.first_name} ${person.last_name}, email: ${applicant.email}`);
}



module.exports = app;
