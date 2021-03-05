var express = require('express');
const VError = require('verror');
const { UserCtrl } = require('../../controller');
var router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * This router handles GET requests to the endpoint '/login'. 
 * Its purpose is to route the requests to the user controller
 * to retrieve the id of the user trying to log in.
 * The id is then signed as a JSON web token.
 * It accepts two query parameters: 'username' and 'password',
 * e.g. GET /login?username=someuser&password=secret
 * @returns A JSON object containing the firstName of the user and the signed token, or an error message.  
 */
router.get('/', function(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;
    getUser(username, password)
    .then(user => {
        if(user) {
            jwt.sign({"id": user.id}, 'secretkey', (err, token) =>{
                res.json({firstName: user.firstName, token})
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


module.exports = router;