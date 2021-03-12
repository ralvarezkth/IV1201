var express = require('express');
const VError = require('verror');
const { UserCtrl } = require('../../controller');
var router = express.Router();
const jwt = require('jsonwebtoken');
const ValidatorUtil = require('../../util/validatorUtil');

/* GET /login */
router.get('/', function(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;

    const validator = new ValidatorUtil();
    const validatedUser = validator.validateUserLogin(username, password);
    if(!validatedUser.error){
        getUser(username, password)
        .then(user => {
            if(user) {
                jwt.sign({"id": user.id}, 'secretkey', (err, token) =>{
                    getRole(user.id).then(data => {
                        user.dataValues.role = data.applicant ? "applicant" : "recruiter";
                        res.json({user, token})
                    });
                });
            } else {
                res.status(401).json({error: VError.info(err).message});
            }

        })
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
    }else{
        res.status(400).json({error: validatedUser.error});
    }
});

async function getUser(username, password) {
    return await UserCtrl.getUser(username, password);
}

async function getRole(id) {
    return await UserCtrl.getRole(id);
}

module.exports = router;