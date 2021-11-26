var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require("fs");
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../db.json")));
var mysql = require('mysql2')
var moment = require("moment")

var connection = mysql.createConnection({
  host : data.host,
  port : data.port,
  user : data.user,
  password : data.password,
  database : data.database
})

router.get("/", function(req, res){
  connection.query(
    `select * from note order by date desc`,
    function(err, result){
      err ? console.log(err) : connection.query(
        `select * from trash order by throw_date desc`,
        function(err, result2){
          err ? console.log(err) : res.send({notes : result, trash : result2})
        }
      )
    }
  )
})

router.get("/add", function(req, res){
  console.log("add");
  var date = moment().format("YYYY-MM-DD HH:mm:ss")
  var title = req.query.title;
  var content = req.query.content;
  connection.query(
    `insert into note(date,title,content) values(?,?,?)`,
    [date,title,content],
    function(err){
      err ? console.log(err) : res.redirect("/")
    }
  )
})

router.get("/update", function(req, res){
  var id = req.query.id
  var date = moment().format("YYYY-MM-DD HH:mm:ss")
  var title = req.query.title;
  var content = req.query.content;
  connection.query(
    `update note set date=?, title=?, content=? where id=?`,
    [date, title, content, id],
    function(err){
      err ? console.log(err) : res.redirect("/")
    }
  )
})

router.get("/trash", function(req, res){
  var id = req.query.id;
  console.log(id)
  connection.query(
    `insert into trash select *, now() from note where id=${id}`,
    function(err){
      err ? console.log(err) : connection.query(
        `delete from note where id=${id}`,
        function(err){
          err ? console.log(err) : res.redirect("/")
        }
      )
    }
  )
})

router.post("/del", function(req,res){
  var id = req.body.id;
  connection.query(
    `delete from trash where id=${id}`,
    function(err){
      err ? console.log(err) : connection.query(
        `select * from trash order by throw_date desc`,
        function(err, result){
          err ? console.log(err) : res.send(result)
        }
      )
    }
  )
})

router.get("/drop", function(req, res){
  connection.query(
    `truncate trash`,
    function(err){
      err ? console.log(err) : res.redirect("/")
    }
  )
})

router.post("/re", function(req, res){
  var id = req.body.id;
  connection.query(
    `insert into note select id,date,title,content from trash where id=${id}`,
    function(err){
      err ? console.log(err) : connection.query(
        `delete from trash where id=${id}`,
        function(err){
          err ? console.log(err) : connection.query(
            `select * from note order by date desc`,
            function(err, result){
              err ? console.log(err) : connection.query(
                `select * from trash order by throw_date desc`,
                function(err, result2){
                  err ? console.log(err) : res.send({notes : result, trash : result2})
                }
              )
            }
          )
        }
      )
    }
  )
})

module.exports = router;
