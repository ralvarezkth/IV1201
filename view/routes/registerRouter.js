var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {UserCtrl} = require('../../controller');
const UserDTO = require('../../model/dto/userDTO');
const ValidatorUtil = require('../../util/validatorUtil');

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
    if(validUserData(user)){
        let userDTO = new UserDTO(null, user.firstName, user.lastName, user.username, user.password, user.email, user.ssn);
        createUser(userDTO)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
    }else{
        //res.status(400).json({error: "Bad Request"});
        res.status(400).json({error: validatedUser.error});    }

});

function validUserData(user){
    let isValid = false;
    var matches = user.password.match(/([0-9].*[a-z])|([a-z].*[0-9])/);
    if(
        user.firstName &&
            user.lastName &&
            user.username &&
            user.password && matches &&
            user.email &&
            user.ssn
    ){isValid = true;}
    return isValid;
    /*
    if(!user.firstName){
        res.status(400).json({error: "Bad Request, invalid first name"});
    }else if(!user.lastName){
        res.status(400).json({error: "Bad Request, invalid last name"});
    }else if(!user.username){
        res.status(400).json({error: "Bad Request, invalid username"});
    }else if(!(user.password | matches | user.password >= 6)){
        res.status(400).json({error: "Bad Request, invalid password. Password must contain at least one number, one letter and be of 6 or more characters long"});
    }else if(user.email){
        res.status(400).json({error: "Bad Request, invalid email"});
    }else if(user.ssn){
        res.status(400).json({error: "Bad Request, invalid social security number"});
    }

     */
}

async function createUser(user) {
    return await UserCtrl.setUser(user);
}

module.exports = router;