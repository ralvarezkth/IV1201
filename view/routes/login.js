var express = require('express');
const VError = require('verror');
const { UserCtrl } = require('../../controller');
var router = express.Router();

/*  */
router.get('/', function(req, res, next) {
    console.log("hello");
    alert("username: " + req.query.username+ "password: " + req.query.password);
    const username = req.query.username;
    const password = req.query.password;
    console.log("username is: " + username);
    getUser(username, password)
    .then(dat => res.json(dat))
    .catch(err => {
        res.status(500).json({error: VError.info(err).message});
    });
});

async function getUser(username, password) {
    const foundUser = await UserCtrl.getUser(username, password); //though controller -> Integration -> Find user
    return foundUser;
}

module.exports = router;



    //res.json([{username: res.body.username, password: res.body.password}]);