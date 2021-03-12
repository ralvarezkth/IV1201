var express = require('express');
var router = express.Router();
const {VError} = require('verror')
const {ContentCtrl} = require('../../controller');
const ContentDTO = require('../../model/dto/contentDTO');

/* GET /content - gets available languages. */
router.get('/', function(req, res, next) {
    getLanguages()
        .then(dat => {
            res.json(dat)})
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
        });
});

/* GET content/:id - gets available content fragments for specified language. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    
    getContent(id)
        .then(dat => res.json(dat))
        .catch(err => {
            res.status(500).json({error: VError.info(err).message});
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

module.exports = router;