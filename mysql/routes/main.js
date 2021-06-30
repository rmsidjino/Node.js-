var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
  });

router.get('/',function(req, res){
    res.render('login');
})

router.get('/signup',function(req, res){
    res.render('signup');
})

router.post('/signup_1',function(req, res){
    var post_id =req.body.post_id;
    var name =req.body.name;
    var password =req.body.password;
    var division =req.body.division;
    var linkcode =req.body.linkcode;
    console.log(post_id, name, password, division, linkcode);
    connection.query(
        `select * from user_list where post_id =?`,
        [post_id],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL connect Error");
            }else{
                if(result.length > 0){
                    res.send("이미 존재하는 아이디");
                }else{
                    connection.query(
                        `insert into user_list (post_id, password, name,
                            division, linkcode) values (?, ?, ?, ?, ?)`,
                            [post_id, password, name, division, linkcode],
                            function(err2, result2){
                                if(err2){
                                    console.log(err2);
                                    res.send("SQL insert Error");
                                }else{
                                    res.redirect("/");
                                }
                            } 
                    )
                }
                }

            }
    )
    res.render('signup');
})


module.exports=router;