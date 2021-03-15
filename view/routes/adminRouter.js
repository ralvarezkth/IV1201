var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');
const {ApplicationCtrl} = require('../../controller');

/* GET applications. */
router.get('/', function(req, res) {
    getApplications().then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({error: VError.info(err).message});
    });
});

/* PUT application - update status of application */
router.put('/:id', function(req, res) {
    let application = typeof(req.body.updatedApplication) === "string" ? JSON.parse(req.body.updatedApplication) : req.body.updatedApplication;
    let id = application.id;
    let statId = application.statusId;

    getApplication(id).then(data => {
        let statusId = data.statusId;

        if (application.version !== data.version) {
            res.status(403).json({error: "Version mismatch."});
            return;
        }

        if (statId !== statusId) {
            updateApplication(application).then(dat => {
                return getApplication(id);
            }).then(app => {
                res.json(app);
            }).catch(err => {
                res.status(500).json({error: VError.info(err).message});
            });
        } else {
            res.json(application);
        }
    }).catch(err => {
        res.status(500).json({error: VError.info(err).message});
    });
});

async function getApplication(id) {
    let application = await ApplicationCtrl.getApplication(id);
    return application;
}

async function getApplications() {
    let applications = await ApplicationCtrl.getApplications();
    return applications;
}

async function updateApplication(application) {
    let app = await ApplicationCtrl.updateApplication(application);
    return app;
}

module.exports = router;