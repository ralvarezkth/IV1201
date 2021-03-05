var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {UserCtrl} = require('../../controller');
const UserDTO = require('../../model/dto/userDTO');

/**
 * This router handles POST requests to the endpoint '/register'. 
 * Its purpose is to route the requests to the user controller
 * to create a user in the database using the values in the request body.
 * The request body should contain an object called newUser with the properties
 * firstName, lastName, username, password, email and ssn. 
 * @returns A JSON object containing a UserDTO instance representing the created user, 
 *          or an error message.  
 */
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