const { Unauthorized } = require('http-errors');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');
const { UserCtrl } = require('../../controller');

/**
 * Checks if user is authorized by checking if they belong to the role Applicant,
 * if not the response status is set to 403 Unauthorized.
 * if no token are to be found the response status is set to 401 Unauthenticated.
 *
 * @param req The HTTP request argument
 * @param res The HTTP response argument
 * @param next The callback argument, passes control to next handler when called
 */
function authApplicant(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(bearerToken, 'secretkey')
        getApplicant(decoded.id)
            .then(user => {
                if(user) {
                    next();
                } else {
                    res.status(403).json({error: "Unauthorized"});
                }
            })
            .catch(err => {
                res.status(500).json({error: VError.info(err).message});
        });
    } else{
        res.status(401).json({error: "Unauthenticated"})
    }
}

/**
 * Verifies the jsonwebtoken, if there are none response status is set to 401.
 *
 * @param req The HTTP request argument
 * @param res The HTTP response argument
 * @param next The callback argument, passes control to next handler when called
 */
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader) {
        try{
            jwt.verify(bearerHeader.split(' ')[1], 'secretkey', (error, authData) => {
                if(error) {
                    res.status(401).json({error: "Unauthenticated"});
                } else {
                    next();
                }
            })
        } catch(error){
            res.status(500).json({error: VError.info(err).message});
        }
    } else {
        res.status(401).json({error: "Unauthorized"});
    }
}

async function getApplicant(id) {
    return await UserCtrl.getApplicant(id);
}

module.exports = {
    verifyToken, authApplicant
};
