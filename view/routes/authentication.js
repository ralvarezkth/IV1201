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
function verifyToken(req,res, next){
    const bearerHeader = req.header['authorization'];
    // Check if undefined
    if(typeof bearerHeader !== 'undefined'){
        console.log("\n YAY token found \n")
    }else{
        //Forbidden
        res.sendStatus(403)
    }
}

module.exports = {
    authUser, authRole, verifyToken
};
