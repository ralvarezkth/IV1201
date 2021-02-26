var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', verifyToken, function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(401);
        } else {
            res.json({
                securedData: "Grattis på födelsedagen Fredrik !! :)"
            });
        }
    });
    
});

module.exports = router;
