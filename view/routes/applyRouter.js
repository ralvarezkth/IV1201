var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res){
    res.json({
        securedData: "You are authorized!"
    });
});

module.exports = router;
