var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', verifyToken, function(req, res) {
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

router.post('/', function(req, res) {
    // validate req.body.newApplication
    // send application data to controller
    res.status(404).json({error: 'This feature has not been implemented yet'})
})

module.exports = router;
