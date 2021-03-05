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
        if(user) {
            jwt.sign({user}, 'secretkey', (err, token) =>{
                getRole(user.id).then(data => {
                    user.dataValues.role = data.applicant ? "a" : "r";
                    res.json({
                        user,
                        token
                    });
                });
            }); 
        } else {
            res.status(401).json({error: VError.info(err).message});
        } 
                    
    })
    .catch(err => {
        res.status(500).json({error: VError.info(err).message});
    });

});

async function getUser(username, password) {
    return await UserCtrl.getUser(username, password);
}

async function getRole(id) {
    return await UserCtrl.getRole(id);
}

module.exports = router;