var express = require('express');
var router = express.Router();

function connect() {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'mysql44.unoeuro.com',
    user     : 'facelex_com',
    password : process.env.DB_PASS,
    database : 'facelex_com_db'
    });

    connection.connect();
    return connection
}

router.get('/', function(req, res, next) {
    var connection = connect()
    connection.query('SELECT work.id, users.name, work.workDate, work.workFrom, work.workTo, work.comment FROM work INNER JOIN users ON users.id = work.user', function(err, rows, fields) {
    if (!err) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.set({ 'Content-Type': 'application/json; charset=utf-8' })
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.json(rows)
        console.log('Nice!');
    }
    else
        console.log('Error while performing Query.');
    });

    connection.end();
});

module.exports = router;