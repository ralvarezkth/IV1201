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

router.post('/', function(req, res) {
    res.status(404).json({error: 'This feature has not been implemented yet'})
})

module.exports = router;
