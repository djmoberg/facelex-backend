var express = require('express');
var router = express.Router();

var db = require('./db');
const bcrypt = require('bcrypt');

router.post('/add', function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let data = [
            [req.body.name, hash]
        ]
        db.query('INSERT INTO users (name, password) VALUES (?)', data, function (err, rows, fields) {
            if (!err) {
                res.send("User added")
            }
            else
                console.log(err);
        });

        // db.end();
    });
});

router.post('/login', function (req, res, next) {
    db.query('SELECT * FROM users WHERE name = (?)', req.body.name, function (err, rows, fields) {
        if (!err) {
            if (rows.length !== 0) {
                bcrypt.compare(req.body.password, rows[0].password, function (err, res2) {
                    if (res2) {
                        req.session.name = req.body.name 
                        res.send("correct")
                    } else {
                        res.send("not correct")
                    }
                });
            } else {
                res.send("not correct")
            }
        }
        else
            console.log(err);
    });
});

router.get('/loggedIn', function (req, res, next) {
    console.log(req.session)
    if (req.session.name) {
        res.send("true")
    } else {
        res.send("false")
    }
});

// router.post('/test', function (req, res, next) {
//     res.send(req.body.name)
// });

module.exports = router;