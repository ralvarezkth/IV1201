var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');

/* GET users listing. */
router.get('/', verifyToken, function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.status(401).json({error: VError.info(err).message});
        } else {
            res.json({
                id: 1, 
                username: "testuser",
                authData
            });
        }
    });
    
});

module.exports = router;
