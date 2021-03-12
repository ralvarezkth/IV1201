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
        console.log("$1");
        getUser(username, password)
        .then(user => {
            console.log("$2");
            if(user) {
                console.log("$3");
                console.log(JSON.stringify(user));
                jwt.sign({"id": user.id}, 'secretkey', (err, token) =>{
                    console.log("$3.1");
                    getRole(user.id).then(data => {
                        console.log("$3.2");
                        user.dataValues.role = data.applicant ? "applicant" : "recruiter";
                        console.log("$3.3");
                        console.log(JSON.stringify(user));
                        res.json({user, token})
                    });
                });
            } else {
                console.log("$4");
                res.status(401).json({error: VError.info(err).message});
            }

        })
        .catch(err => {
            console.log("$5");
            res.status(500).json({error: VError.info(err).message});
        });
    }else{
        console.log("$6");
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