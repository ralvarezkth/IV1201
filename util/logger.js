const Sequelize = require('sequelize');
const {VError, WError} = require("verror");
const LogEntry = require("../model/entity/logEntry");
const LogEntryDTO = require("../model/dto/logEntryDTO");

class Logger {

    /**
     * Creates a new instance of this class and initializes the database connection
     * using the environment variable DATABASE_URL, or using the default credentials 
     * for a local database.
     * Initialization creates the model entities and the required database tables 
     * if they are non-existent. 
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        process.env.HEROKU_POSTGRESQL_BRONZE_URL ?
        this.logger = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
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
        this.logger = new Sequelize('recruit-log', 'postgres', 'admin', {
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
        LogEntry.createModel(this.logger);
        try {
            await this.logger.authenticate();
            await this.logger.sync();
        } catch (error) {
            console.log(error);
            throw new WError(
                {
                    name: 'DatabaseAuthSyncError',
                    cause: error,
                    info: {
                        message: 'Technical issues, please try again later.'
                    }
                },
                'Could not connect to the database.'
            ); 
        }
    }

    /**
     * Stores a log entry in the log. 
     * The parameter is truncated to 2000 chars.
     * 
     * @param {string} event The event to be logged.
     * @returns {LogEntry} createdLogEntry The stored log entry.
     * @throws Throws an exception if unable to store the log entry
     */
    async log(event) {
        if (event.length > 2000) {
            event = event.substring(0, 2000);
        }
        try {
            return await this.logger.transaction(async (t) => {
                return await LogEntry.create(new LogEntryDTO(null, event), {transaction: t});
            });
        } catch (error) {
            throw new WError(
                {
                    name: 'CreateLogFailedError',
                    cause: error,
                    info: {
                        message: 'Technical issues, please try again later.'
                    }
                },
                `The event could not be logged. Please contact the system administrator`
            );
        }
    }
}
module.exports = Logger;