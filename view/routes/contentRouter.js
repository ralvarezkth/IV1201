var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {ContentCtrl, ErrorCtrl} = require('../../controller');
const ContentDTO = require('../../model/dto/contentDTO');

/* GET /content - gets available languages. */
router.get('/', function(req, res, next) {
    getLanguages()
        .then(dat => {
            res.json(dat)})
        .catch(err => {
            getError(err.name).then(er => {
                res.status(500).json({error: er});
            });
        });
});

/* GET content/:id - gets available content fragments for specified language. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    
    getContent(id)
        .then(dat => res.json(dat))
        .catch(err => {
            getError(err.name).then(er => {
                res.status(500).json({error: er});
            });
        });
});

async function getLanguages() {
    const languages = await ContentCtrl.getLanguages();
    return languages;
}

async function getContent(id) {
    const content = await ContentCtrl.getContent(id);
    return content;
}

async function getError(name) {
    let err = await ErrorCtrl.getError(name);
    return err;
}

module.exports = router;