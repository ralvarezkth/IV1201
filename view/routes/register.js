var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {UserCtrl} = require('../../controller');
const UserDTO = require('../../model/dto/UserDTO');

/* POST registration. */
router.post('/', function(req, res, next) {
    let data = req.body.newUser;
    let dob = data.dob.slice(2, 4) + data.dob.slice(5, 7) + data.dob.slice(8);

    let userDTO = new UserDTO(null, data.firstName, data.lastName, data.username, data.password, data.email, dob);

    createUser(userDTO)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
});

async function createUser(user) {
    const createdUser = await UserCtrl.setUser(user);
    return createdUser;
}

module.exports = router;