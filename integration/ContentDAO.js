'use strict';

const Sequelize = require('sequelize');
const Content = require('../model/entity/content');
const ContentFragment = require('../model/entity/contentFragment');
const Fragment = require('../model/entity/fragment');
const ContentDTO = require('../model/dto/contentDTO');
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
        Content.hasMany(ContentFragment, {foreign_key: 'content_id'});
        Fragment.hasMany(ContentFragment, {foreign_key: 'fragment_id'});
        ContentFragment.belongsTo(Content, {foreignKey: 'content_id'});
        ContentFragment.belongsTo(Fragment, {foreignKey: 'fragment_id'});
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
     * Gets the available languages from the database and returns holding the data if successful
     * or throws a GetLanguagesFailedError exception otherwise.
     * @throws GetLanguagesFailedError exception if database call fails.
     * @return promise holding available languages.
     */

    async getLanguages() {
        try {
            return await Content.findAll({attributes: ["id", "lang"]});
        } catch (err) {
            throw new WError(
                {
                    name: 'GetLanguagesFailedError',
                    cause: err,
                    info: {
                        ContentDAO: 'The call to findAll has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not create person ${JSON.stringify(person)}.`
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

    async getContent(id) {
        try {
           return await Content.findAll({
               where: {id},
               attributes: ["id", "lang"],
               include: [{
                   model: ContentFragment,
                   attributes: ["value"],
                   include: [{
                       model: Fragment,
                       attributes: ["name"]
                   }]
               }]
           }); 
        } catch (err) {
            throw new WError(
                {
                    name: 'GetContentFailedError',
                    cause: err,
                    info: {
                        ContentDAO: 'The call to findAll has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not create person ${JSON.stringify(person)}.`
            );
        }
    }

}
module.exports = ContentDAO;