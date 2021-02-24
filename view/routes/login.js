var express = require('express');
var router = express.Router();

/*  */
router.post('/', function(req, res, next) {
alert("username: "res.body.username+ "password: "res.body.password)
    //though controller -> Integration -> Find user
    // -> auth though athentication.js (?) ->
//res.json([{username: res.body.username, password: res.body.password}]);
});

module.exports = router;
