var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res) {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        try {
            if(error) {
                res.status(401).json({error: VError.info(error).message});
            } else {
                res.json({
                    securedData: "You are authorized!"
                });
            }
        } catch (err) {
            res.status(500).json({error: VError.info(err).message});
        }

    });

});

module.exports = router;
