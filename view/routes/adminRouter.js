var express = require('express');
var router = express.Router();
const { verifyToken } = require('./authentication');
const {VError} = require('verror');
const jwt = require('jsonwebtoken');
const {ApplicationCtrl, ErrorCtrl} = require('../../controller');

/* GET applications. */
router.get('/', function(req, res) {   
    getApplications(1).then(data => {
        res.json(data);
    }).catch(err => {
        getError(err.name).then(er => {
            res.status(500).json({error: er});
        })
    });
});

/* GET specific application details. */
router.get('/:id', function(req, res) {
    let id = req.params.id;

    getApplication(id).then(data => {
        res.json(data);
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
            getError("VersionMismatchError").then(data => {
                res.status(403).json({error: data});
            });
            return;
        }

        if (statId !== statusId) {
            updateApplication(application).then(dat => {
                return getApplication(id);
            }).then(app => {
                res.json(app);
            }).catch(err => {
                getError(err.name).then(er => {
                    res.status(500).json({error: er});
                });
            });
        } else {
            res.json(application);
        }
    }).catch(err => {
        console.log("ERRRASs")
        console.log(err)
        getError(err.name).then(er => {
            res.status(500).json({error: er});
        });
    });
});

async function getApplication(id) {
    let application = await ApplicationCtrl.getApplication(id);
    return application;
}

async function getApplications(langId) {
    let applications = await ApplicationCtrl.getApplications(langId);
    return applications;
}

async function updateApplication(application) {
    let app = await ApplicationCtrl.updateApplication(application);
    return app;
}

async function getError(name) {
    let err = await ErrorCtrl.getError(name);
    return err;
}

module.exports = router;