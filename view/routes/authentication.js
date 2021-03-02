const { Unauthorized } = require('http-errors');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');
const { UserCtrl } = require('../../controller');

function authUser(req, res, next){
    if(req.user == null){
        res.status(401)
        return res.send("You need to sign in.")
    }
    next()
}

function authRole(roleName){
    const role = roleName.toLowerCase();
    //TODO try get user by id in table for "role"
    if(req.user == null){
        res.status(403)
        return res.send("You do not seem to have the correct role");
    }
    next();
}
//check if user has the role Applicant
function authApplicant(req, res, next){
    const bearerHeader = req.headers['authorization'];
    //if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    const decoded = jwt.verify(bearerToken, 'secretkey')
    getApplicant(decoded.id)
        .then(user => {
            console.log("\n\n\n\n"+ user)
            if(user) {
                next();
            } else {
                res.status(403).json({error: "Unauthorized"});
            }
        })
}

//to veryfy a token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({error: "Unauthenticated"});
    }
}

async function getApplicant(id) {
    return await UserCtrl.getApplicant(id);
}

module.exports = {
    authUser, authRole, verifyToken, authApplicant
};
