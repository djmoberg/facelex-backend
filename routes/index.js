var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.send(JSON.parse({msg: "HELLO"}));
});

module.exports = router;
