var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');
const {ErrorCtrl} = require('../../controller');

/* GET users listing. */
router.get('/', function(req, res){
    res.json({
        securedData: "You are authorized!"
    });
});

router.post('/', function(req, res) {
    // validate req.body.newApplication
    // send application data to controller
    getError("FeatureNotImplementedError").then(er => {
        res.status(404).json({error: er});
    });
});

async function getError(name) {
    let err = await ErrorCtrl.getError(name);
    return err;
}

module.exports = router;
