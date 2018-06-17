var express = require('express');
var router = express.Router();

var db = require('./db');
const bcrypt = require('bcrypt');
var auth = require('../routes/auth')

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

router.post('/login', auth.authenticate('login'), function (req, res, next) {
    res.send("Logged in")
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send("Logged out")
});

router.get('/loggedIn', function (req, res, next) {
    if (req.user) {
        res.json({"loggedIn": true, "username": req.user.username})
    } else {
        res.json({"loggedIn": false})
    }
});

// router.post('/test', function (req, res, next) {
//     res.send(req.body.name)
// });

module.exports = router;