var express = require('express');
const VError = require('verror');
const { UserCtrl } = require('../../controller');
var router = express.Router();
const jwt = require('jsonwebtoken');

/*  */
router.get('/', function(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;
    getUser(username, password)
        .then(user => {

        jwt.sign({user}, 'secretkey', (err, token) =>{
            res.json({
                token, user
            })
        });
    })
    .catch(err => {
        res.status(500).json({error: VError.info(err).message});
    });

});

async function getUser(username, password) {
    return await UserCtrl.getUser(username, password);
}

module.exports = router;