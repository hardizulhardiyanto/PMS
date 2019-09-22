var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
const fileUpload = require('express-fileupload')

// database  LOCAL----------\\
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'ch23',
//   password: 'hardy777666',
//   port: 5432,
// })


// // database HEROKU----------\\
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'hlwhiojjqrljsl',
  host: 'ec2-54-235-181-55.compute-1.amazonaws.com',
  database: 'd6i7gtmv3jlh2u',
  password: 'c8d9f83ff5e57b56a72254603f5b3cad6e9eac93728b91501d7216f3fe34a31e',
  port: 5432,
})

//----end database---\\

var indexRouter = require('./routes/index')(pool);
var projectsRouter = require('./routes/projects')(pool); 
var profileRouter = require('./routes/profile')(pool);
var usersRouter = require('./routes/users')(pool);

var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(fileUpload(path.join(__dirname, '../public/images')));

//use session login
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/profile', profileRouter);
app.use('/users', usersRouter);



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
