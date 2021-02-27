'use strict';

const Sequelize = require('sequelize');
const Content = require('../model/entity/Content');
const ContentFragment = require('../model/entity/ContentFragment');
const Fragment = require('../model/entity/Fragment');
const ContentDTO = require('../model/dto/ContentDTO');
const { WError } = require('verror');

/**
 * This class handles all content-specific communication with the database.
 */
class ContentDAO {

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
        Content.createModel(this.database);
        Fragment.createModel(this.database);
        ContentFragment.createModel(this.database);
    }

    async initTables() {
        try {
            await this.database.authenticate();
            await this.database.sync();
        } catch (error) {
            console.log(error);
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

}
module.exports = ContentDAO;


