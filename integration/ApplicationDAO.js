'use strict';

const Sequelize = require('sequelize');
const Application = require('../model/entity/application');
const ApplicationCompetence = require('../model/entity/applicationCompetence');
const Competence = require('../model/entity/competence');
const Duration = require('../model/entity/duration');
const Availability = require('../model/entity/availability');
const Status = require('../model/entity/status');
const ApplicationDTO = require('../model/dto/applicationDTO');
const { WError } = require('verror');

/**
 * This class handles all content-specific communication with the database.
 */
class ApplicationDAO {

    /**
     * Creates a new instance of this class and initializes the database connection
     * using the environment variable DATABASE_URL, or using the default credentials 
     * for a local database.
     * Initialization creates the model entities and the required database tables 
     * if they are non-existent. 
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        process.env.DATABASE_URL ? 
        this.database = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            define: {
                freezeTableName: true
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }) 
        :
        this.database = new Sequelize('dbtest', 'postgres', 'admin', {
            host: 'localhost',
            port: '5432',
            dialect: 'postgres',
            define: {
                freezeTableName: true
            }
        });
        this.initialize();
        
    }

    async initialize() {
        this.initModels();
        await this.initTables();
    }

    initModels() {
        Application.createModel(this.database);
        ApplicationCompetence.createModel(this.database);
        Competence.createModel(this.database);
        Duration.createModel(this.database);
        Availability.createModel(this.database);
        Status.createModel(this.database);
        Application.hasMany(ApplicationCompetence, {foreignKey: 'application_id'});
        Application.hasMany(Availability, {foreignKey: 'application_id'});
        Application.belongsTo(Status, {foreignKey: 'status_id'});
        ApplicationCompetence.belongsTo(Application, {foreignKey: 'application_id'});
        ApplicationCompetence.belongsTo(Competence, {foreignKey: 'competence_id'});
        ApplicationCompetence.belongsTo(Duration, {foreignKey: 'duration_id'});
        Competence.hasMany(ApplicationCompetence, {foreignKey: 'competence_id'});
        Duration.hasMany(ApplicationCompetence, {foreignKey: 'duration_id'});
        Availability.belongsTo(Application, {foreignKey: 'application_id'});
        Status.hasMany(Application, {foreignKey: "status_id"});
    }

    async initTables() {
        try {
            await this.database.authenticate();
            await this.database.sync();
        } catch (error) {
            throw new WError(
                {
                    name: 'DatabaseAuthSyncError',
                    cause: error,
                    info: {
                        UserDAO: 'The call to authenticate and sync has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                'Could not connect to the database.'
            );   
        }
    }

    async getApplication(id) {
        try {
            let app = await Application.findOne({
                where: {id},
                attributes: ["id", "version", "status_id"],
                include: [{
                    model: ApplicationCompetence,
                    include: [{
                        model: Competence,
                        attributes: ["name"]
                    },
                    {
                        model: Duration,
                        attributes: ["years"]
                    }]
                },
                {
                    model: Availability,
                    attributes: ["from_date", "to_date"]
                },
                {
                    model: Status,
                    attributes: ["name"]
                }]
            });

            let acs = [];
            let avs = [];

            app.dataValues.ApplicationCompetences.forEach(ac => {
                acs.push({competence: ac.Competence.name, duration: ac.Duration.years});
            });

            app.dataValues.Availabilities.forEach(av => {
                let f_date = new Date(av.from_date * 1000);
                let t_date = new Date(av.to_date * 1000);

                avs.push({from: f_date.getUTCDate() + "/" + (f_date.getUTCMonth() + 1) + "/" + f_date.getUTCFullYear(), 
                        to: t_date.getUTCDate() + "/" + (t_date.getUTCMonth() + 1) + "/" + t_date.getUTCFullYear()});
            });

            return new ApplicationDTO(app.dataValues.id, acs, avs, app.dataValues.version, app.dataValues.status_id, app.dataValues.Status.name);
        } catch (err) {
            throw new WError(
                {
                    name: 'GetApplicationFailedError',
                    cause: err,
                    info: {
                        ApplicationDAO: 'The call to findByPk has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not get Application with id ${id}.`
            );
        }
    }

    /**
     * Gets the available languages from the database and returns holding the data if successful
     * or throws a GetLanguagesFailedError exception otherwise.
     * @throws GetLanguagesFailedError exception if database call fails.
     * @return promise holding available languages.
     */

    async getApplications() {
        try {
            let app = await Application.findAll({
                attributes: ["id", "version", "status_id"],
                include: [{
                    model: ApplicationCompetence,
                    include: [{
                        model: Competence,
                        attributes: ["name"]
                    },
                    {
                        model: Duration,
                        attributes: ["years"]
                    }]
                },
                {
                    model: Availability,
                    attributes: ["from_date", "to_date"]
                },
                {
                    model: Status,
                    attributes: ["name"]
                }]
            });

            let data = [];

            app.forEach(a => {
                let id = a.dataValues.id;
                let version = a.dataValues.version;
                let statusId = a.dataValues.status_id;
                let status = a.dataValues.Status.name;
                let acs = [];
                let avs = [];

                a.dataValues.ApplicationCompetences.forEach(ac => {
                    acs.push({competence: ac.Competence.name, duration: ac.Duration.years});
                });

                a.dataValues.Availabilities.forEach(av => {
                    let f_date = new Date(av.from_date * 1000);
                    let t_date = new Date(av.to_date * 1000);

                    avs.push({from: f_date.getUTCDate() + "/" + (f_date.getUTCMonth() + 1) + "/" + f_date.getUTCFullYear(), 
                            to: t_date.getUTCDate() + "/" + (t_date.getUTCMonth() + 1) + "/" + t_date.getUTCFullYear()});
                });
                
                data.push(new ApplicationDTO(id, acs, avs, version, statusId, status));
            });

            return data;


        } catch (err) {
            throw new WError(
                {
                    name: 'GetApplicationsFailedError',
                    cause: err,
                    info: {
                        ApplicationDAO: 'The call to findAll has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not get Application.`
            );
        }
        
    }

    async updateApplication(application) {
        try {
            return await Application.update({
                status_id: application.statusId,
                version: application.version + 1
                },
                {
                    fields: ["status_id", "version"],
                    where: {id: application.id}
            });
        } catch (err) {
            throw new WError(
                {
                    name: 'UpdateApplicationFailedError',
                    cause: err,
                    info: {
                        ApplicationDAO: 'The call to update has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not update Application with id ${application.id}.`
            );
        }
    }

}
module.exports = ApplicationDAO;