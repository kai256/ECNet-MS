var express = require('express');
var db = require('../models/db.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '法官工作空间'
    });
});

// /caselist.html
router.get('/caselist.html', function(req, res, next) {
    db.query("select * from ecnetms_case where casestatus = 1", function(err, rows) {
        var str = JSON.stringify(rows);
        var json = JSON.parse(str);
        res.render('caselist', {
            data: json
        });
    });
    //res.render('caselist',{ title : 'Express' });
});

// /caselistno.html
router.get('/caselistno.html', function(req, res, next) {
    db.query("select * from ecnetms_case where casestatus = 0", function(err, rows) {
        var str = JSON.stringify(rows);
        var json = JSON.parse(str);
        res.render('caselistno', {
            data: json
        });
    });
});

// /caselistyes.html
router.get('/caselistyes.html', function(req, res, next) {
    db.query("select * from ecnetms_case where casestatus = 2", function(err, rows) {
        var str = JSON.stringify(rows);
        var json = JSON.parse(str);
        res.render('caselistyes', {
            data: json
        });
    });
});


router.get('/login.html', function(req, res, next) {
    res.render('login', {
        title: 'Express'
    });
});
//暂不处理logincheck的get请求
// router.get('/logincheck.html',function(req,res,next){
// 	//console.log(req.body);
// 	//res.send("success.");
// 	res.location('/login.html');
// });
router.post('/logincheck.html', function(req, res, next) {
    db.query("select * from ecnetms_admin where uid ='" + req.body.username + "'", function(err, rows) {
        //if(err) res.redirect('/login.html');
        var str = JSON.stringify(rows);
        var json = JSON.parse(str);
        if (json == "") {
            res.redirect('/login.html');
        }
        if ((req.body.username === json[0]['uid']) && (req.body.userpwd === json[0]['pwd'])) {
            console.log('username and password are both correct');
            var user = {
                'username': req.body.username
            };
            req.session.user = user;
            res.redirect('/caselist.html');
        } else {
            console.log("username or password is incorrect");
            res.redirect('/login.html');
        }
    });
});
router.post('/loginto.html', function(req, res, next) {
	console.log(">>>"+req.body.username);
    db.query("select * from ecnetms_admin where uid ='" + req.body.username + "'", function(err, rows) {
        //if(err) res.redirect('/login.html');
        var str = JSON.stringify(rows);
        var json = JSON.parse(str);
        if (json == "") {
        	console.log(">>it's fault")
            res.json({'data':false});
            return;
        }
        if ((req.body.username === json[0]['uid']) && (req.body.password === json[0]['pwd'])) {
            console.log('username and password are both correct');
            res.json({'data':true});
        } else {
            console.log("username or password is incorrect");
            res.json({'data':false});
        }
    });
})
router.get('/logout.html', function(req, res, next) {
    req.session.user = null;
    res.redirect("/login.html");
})
module.exports = router;