var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {UserCtrl} = require('../../controller');
const UserDTO = require('../../model/dto/userDTO');

/* POST /content - Applicant account creation. */
router.post('/', function(req, res, next) {
    let user = req.body.newUser;

    let userDTO = new UserDTO(null, user.firstName, user.lastName, user.username, user.password, user.email, user.ssn);

    createUser(userDTO)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
});

async function createUser(user) {
    return await UserCtrl.setUser(user);
}

module.exports = router;