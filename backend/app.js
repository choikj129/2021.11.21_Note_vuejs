var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");
const data = JSON.parse(fs.readFileSync(__dirname + '/db.json'));

var app = express();

var mysql = require('mysql2')

var connection = mysql.createConnection({
  host : data.host,
  port : data.port,
  user : data.user,
  password : data.password,
  database : data.database
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/load", function(req, res){
  connection.query(
    `select * from note`,
    function(err, result){
      if(err){
        console.log(err)
      }else{
        res.send(result)
      }
    }
  )
})

app.post("/add", function(req, res){
  console.log("add")
  var x = req.body.x;
  var y = req.body.y;
  var w = req.body.w;
  var h = req.body.h;
  connection.query(
    `insert into note(x,y,w,h) values(?,?,?,?)`,
    [x,y,w,h],
    function(err){
      if(err){
        console.log(err)
      }else{
        res.json({})
      }
    }
  )
})

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
