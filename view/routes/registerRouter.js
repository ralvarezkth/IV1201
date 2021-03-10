var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {UserCtrl} = require('../../controller');
const UserDTO = require('../../model/dto/userDTO');
const ValidatorUtil = require('../../util/validatorUtil');

/* POST /content - Applicant account creation. */
router.post('/', function(req, res, next) {
    let user = req.body.newUser;
    const validator = new ValidatorUtil();
    const validatedUser = validator.validateNewUser(user);
    if (!validatedUser.error) {
        let userDTO = new UserDTO(null, user.firstName, user.lastName, user.username, user.password, user.email, user.ssn);
        createUser(userDTO)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
    }else{
        res.status(400).json({error: validatedUser.error});    }
});

async function createUser(user) {
    return await UserCtrl.setUser(user);
}

module.exports = router;