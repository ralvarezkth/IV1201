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
        return res.send("You do not seem to have the ")
    }
    next()
}

//to veryfy a token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({error: VError.info(err).message});
    }
}

module.exports = {
    authUser, authRole, verifyToken
};
