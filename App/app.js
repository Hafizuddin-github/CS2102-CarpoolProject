var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* --- V7: Using dotenv     --- */
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* --- V2: Adding Web Pages --- */
var aboutRouter = require('./routes/about');
/* ---------------------------- */

/* --- V3: Basic Template   --- */
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
/* ---------------------------- */

/* --- V4: Database Connect --- */
var selectRouter = require('./routes/select');
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
var formsRouter = require('./routes/forms');
/* ---------------------------- */
var insertRouter = require('./routes/insert');
/* ---------------------------- */

var login = require('./auth/login');
var logout = require('./auth/logout');
var signup = require('./auth/signup');
var dashboard = require('./routes/dashboard');
var driver_advertise = require('./routes/driver_advertise');
var authMiddleware = require('./auth/middleware');
var init = require('./routes/init');
var passenger = require('./routes/passenger');
var driver_update = require('./routes/driver_update');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/users', usersRouter);

/* --- V2: Adding Web Pages --- */
app.use('/about', aboutRouter);
/* ---------------------------- */

/* --- V3: Basic Template   --- */
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
/* ---------------------------- */

/* --- V4: Database Connect --- */
app.use('/select', authMiddleware.ensureLoggedIn, selectRouter);
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
app.use('/forms', formsRouter);
/* ---------------------------- */

/* --- V6: Modify Database  --- */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/insert', insertRouter);
/* ---------------------------- */

app.use('/auth/login', login);
app.use('/auth/logout', logout);
app.use('/auth/signup',signup);
app.use('/dashboard',authMiddleware.ensureLoggedIn, dashboard);
app.use('/driver_advertise',authMiddleware.ensureLoggedIn, driver_advertise);
app.use('/init',authMiddleware.ensureLoggedIn, init);
app.use('/passenger', authMiddleware.ensureLoggedIn, passenger);
app.use('/driver_update', authMiddleware.ensureLoggedIn, driver_update);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');

  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;