'use strict';

const Sequelize = require('sequelize');
const ValidatorUtil = require('../util/validatorUtil');
const Person = require('../model/entity/person');
const PersonDTO = require('../model/dto/personDTO');
const Applicant = require('../model/entity/applicant');
const ApplicantDTO = require('../model/dto/applicantDTO');
const UserDTO = require('../model/dto/userDTO');
const Logger = require('../util/logger');
const { WError } = require('verror');

/**
 * This class handles all user-specific communication with the database.
 */
class UserDAO {

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
        this.logger = new Logger();
        this.validator = new ValidatorUtil();
    }

    async initialize() {
        this.initModels();
        await this.initTables();
    }

    initModels() {
        Person.createModel(this.database);
        Applicant.createModel(this.database);
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
                        message: 'Technical issues, please try again later.'
                    }
                },
                'Could not connect to the database.'
            );   
        }
    }

    /**
     * Stores a new user (applicant) in the database.
     * 
     * @param {UserDTO} user The user to be created
     * @returns {UserDTO} createdUser The created user
     * @throws Throws an exeption if unable to set the specified user.
     */
    async setUser(user) {
        const ValidatedUser = this.validator.validateNewUser(user);
        if (ValidatedUser.error) {
            throw new WError(
                {name: "DataValidationError", info: {message: ValidatedUser.error}},
                'User data validation has failed.'
            );
        }
        const { _id, firstName, lastName, username, password, email, ssn } = ValidatedUser;
        const newPerson = new PersonDTO(null, firstName, lastName, username, password, 0);

        try {
            return await this.database.transaction(async (t) => {
                const createdPerson = await Person.create(newPerson, {transaction: t});
                const newApplicant = new ApplicantDTO(createdPerson.id, email, ssn);
                const createdApplicant = await Applicant.create(newApplicant, {include: Person, transaction: t});

                return new UserDTO(
                    createdPerson.id, 
                    createdPerson.firstName, 
                    createdPerson.lastName, 
                    createdPerson.username, 
                    createdPerson.password, 
                    createdApplicant.email, 
                    createdApplicant.ssn
                );
            
            });   
        } catch (error) {
            let message = 'Technical issues, please try again later.';

            if (error.name === 'SequelizeUniqueConstraintError') 
                message = `The username '${username}' is not available`;
            
            this.logger.log(error.stack.substring(0, 2000));
            throw new WError(
            {
                name: 'CreateUserFailedError',
                cause: error,
                info: {
                    message: message
                }
            },
            'The user could not be created.'
            );
            
            
        }
    }

    /**
     * Retrieves a user (Person) from the database by username and compares 
     * its password with the provided password. Repeated failed attempts
     * are logged.
     * 
     * @param {string} username The username to find in the database. 
     * @param {string} password The password to compare with
     * @returns {Person} The found person.
     * @throws an exeption if unable to retrieve Person or if the provided 
     *         password is incorrect. 
     */
    async getUser(username, password){
        const ValidatedUsername = this.validator.validateUserLogin(username, password);
        if (ValidatedUsername.error) {
            throw new WError(
                {name: "DataValidationError", info: {message: ValidatedUsername.error}},
                'Username and password validation has failed.'
            );
        }
        try{
            return await this.database.transaction(async (t) => {
                const user = await Person.findOne({ where: {username: ValidatedUsername}, transaction: t} );
                if(user && user.password) {
                    if(user.password === password) {
                        await Person.update({ failedLoginAttempts: 0 }, { where: {username: ValidatedUsername}, transaction: t});
                        return user;
                    } else {
                        await Person.increment('failedLoginAttempts', { where: {username: ValidatedUsername}});
                        if (user.failedLoginAttempts >= 7) {
                            this.logger.log(`${user.failedLoginAttempts} failed login attempts for ${ValidatedUsername}`);
                            throw new WError(
                                {name: "TooManyFailedLoginAttemptsError", info: {message: "Armed forces have been dispatched to your address. I suggest you get your affairs in order..."}},
                                'Too many failed login attempts.'
                            );
                        } else if (user.failedLoginAttempts >= 5) {
                            this.logger.log(`${user.failedLoginAttempts} failed login attempts for ${ValidatedUsername}`);
                            throw new WError(
                                {name: "TooManyFailedLoginAttemptsError", info: {message: "Too many failed login attempts, please wait 30 minutes and try again."}},
                                'Too many failed login attempts.'
                            );
                        } else if(user.failedLoginAttempts >= 3) {
                            this.logger.log(`${user.failedLoginAttempts} failed login attempts for ${ValidatedUsername}`);
                            throw new WError(
                                {name: "TooManyFailedLoginAttemptsError", info: {message: "Too many failed login attempts, please wait 1 minute and try again."}},
                                'Too many failed login attempts.'
                            );
                        } 
                    }
                }
                throw new WError(
                    {name: "InvalidPasswordError", info: {message: "The provided username and password do not match."}},
                    'The provided password is invalid.'
                );
            });
        } catch(error){
            if(error.name && (error.name === 'InvalidPasswordError' || error.name === 'TooManyFailedLoginAttemptsError')) {
                throw error;
            }
            this.logger.log(error.stack.substring(0, 2000));
            throw new WError(
                {
                    name: 'GetPersonFailedError',
                    cause: error,
                    info: {
                        message: `An error occured, please try again later.`
                    }
                },
                "Unhandled error, please contact the system administrator."
            );
        }
    }

    /**
     * Retrieves applicant from database by the person id.
     *
     * @param id The person_id to find in the database.
     * @returns {Promise<*>} The applicant with the matching id, if no such applicant exists null is returned.
     */
    async getApplicant(id){
        try{
            return await this.database.transaction(async (t) => {
                const applicant = await Applicant.findOne({ where: {person_id: id}, transaction: t} );
                return applicant;
            });
        }catch(error){
            this.logger.log(JSON.stringify(error));
            throw new WError(
                {
                    name: 'GetApplicantFailedError',
                    cause: error,
                    info: {
                        UserDAO: 'Invalid password.',
                        message: 'User do not have this level of access'
                    }
                },
                `Could not get access to desired page`
            );
        }
    }

}
module.exports = UserDAO;


