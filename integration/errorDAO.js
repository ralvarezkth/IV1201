'use strict';

const Sequelize = require('sequelize');
const ErrorFeedback = require('../model/entity/errorFeedback');
const Message = require('../model/entity/message');
const Type = require('../model/entity/type');
const { WError } = require('verror');

/**
 * This class handles all content-specific communication with the database.
 */
class ErrorDAO {

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
        ErrorFeedback.createModel(this.database);
        Message.createModel(this.database);
        Type.createModel(this.database);
        ErrorFeedback.belongsTo(Message, {foreignKey: 'message_id'});
        Message.hasOne(ErrorFeedback, {foreignKey: 'message_id'});
        Type.hasMany(ErrorFeedback, {foreignKey: 'type_id'});
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

    /**
     * Gets the content fragments for the specified languages and returns a promise holding the data
     * if successful, or throws a GetContentFailedError exception otherwise.
     * @param {integer} id id of specified language for which to return the content fragment data for.
     * @throws GetContentFailedError exception if database call fails.
     * @return promise holding content fragment data.
     */

    async getError(name) {
        try {
           let error = await Type.findOne({
               where: {name},
               attributes: ["id", "name"],
               include: [{
                   model: ErrorFeedback,
                   attributes: ["lang_id"],
                   include: [{
                       model: Message,
                       attributes: ["content"]
                   }]
               }]
           });

           error = error.dataValues.ErrorFeedbacks;
           let errorMsgs = [];

           error.forEach(err => {
            let msg = err.Message.dataValues.content;

            errorMsgs.push({langId: err.lang_id, msg});
           });

           return errorMsgs;
        } catch (err) {
            throw new WError(
                {
                    name: 'GetErrorFailedError',
                    cause: err,
                    info: {
                        ErrorDAO: 'The call to findAll has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not get Error.`
            );
        }
    }

}
module.exports = ErrorDAO;
