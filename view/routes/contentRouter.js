var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {ContentCtrl} = require('../../controller');
const ContentDTO = require('../../model/dto/ContentDTO');

/* GET content. */
router.get('/', function(req, res, next) {
    let id = req.body.id;



    let userDTO = new UserDTO(null, user.firstName, user.lastName, user.username, user.password, user.email, user.ssn);

    getContent(id)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
});

async function getContent(id) {
    const content = await ContentCtrl.getContent(id);
    return content;
}

module.exports = router;