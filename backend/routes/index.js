var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require("fs");
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../db.json")));
var mysql = require('mysql2')

var connection = mysql.createConnection({
  host : data.host,
  port : data.port,
  user : data.user,
  password : data.password,
  database : data.database
})

router.get("/", function(req, res){
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

router.post("/add", function(req, res){
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


module.exports = router;
