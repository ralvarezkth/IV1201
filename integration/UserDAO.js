'use strict';

const Sequelize = require('sequelize');
const Validator = require('validator');
const Person = require('../model/entity/Person');
const PersonDTO = require('../model/dto/PersonDTO');
const Applicant = require('../model/entity/Applicant');
const ApplicantDTO = require('../model/dto/ApplicantDTO');
const UserDTO = require('../model/dto/UserDTO');
const { WError } = require('verror');

/**
 * This class handles all user-specific communication with the database.
 */
class UserDAO {

    /**
     * Creates a new instance of this class and initializes the database connection.
     * Initialization creates the model entities and the required database tables 
     * if they are non-existent. 
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
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
        Person.createModel(this.database);
        Applicant.createModel(this.database);
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

    async setPerson(person) {
        try {
            return await this.database.transaction(async (t) => {
                return await Person.create(person, {transaction: t});
            });
        } catch (error) {
            throw new WError(
                {
                    name: 'CreatePersonFailedError',
                    cause: error,
                    info: {
                        UserDAO: 'The call to create has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not create person ${JSON.stringify(person)}.`
            );
        }
    }

    async setApplicant(applicant) {
        try {
            return await this.database.transaction(async (t) => {
                return await Applicant.create(applicant, {include: Person, transaction: t});
            });
        } catch (error) {
            throw new WError(
                {
                    name: 'CreateApplicantFailedError',
                    cause: error,
                    info: {
                        UserDAO: 'The call to create has failed.',
                        message: 'Technical issues, please try again later.'
                    }
                },
                `Could not create applicant ${JSON.stringify(applicant)}.`
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
        try {
            let reason = [];
            let keys = Object.keys(user);
            keys.splice(keys.indexOf("id"), 1);

            keys.forEach(key => {
                if (Validator.isEmpty(user[key])) {
                    valid = false; // TODO: is this variable still used?
                }

                user[key] = Validator.escape(user[key])
                user[key] = Validator.ltrim(user[key])
                user[key] = Validator.rtrim(user[key])
                user[key] = Validator.stripLow(user[key])
            });

            if (!Validator.matches(user.firstName, /^[a-zA-Z\\s\-]+$/) || !Validator.matches(user.lastName, /^[a-zA-Z\\s\-]+$/)) {
                reason.push("Invalid name format; alphabetic characters as well as space and dash allowed.");
            }

            if (!Validator.isEmail(user.email)) {
                reason.push("Invalid email format; address@domain.com etc.");
            }
            user.email = Validator.normalizeEmail(user.email,
                {all_lowercase: true, gmail_remove_dots: true, gmail_remove_subaddress: true,
                gmail_convert_googlemaildotcom: true, outlookdotcom_remove_subaddress: true,
                yahoo_remove_subaddress: true, icloud_remove_subaddress: true});

            if (!Validator.isStrongPassword(user.password, {minLength: 6, minNumbers: 1, minUppercase: 0, minSymbols: 0})) {
                reason.push("Invalid password; minimum length 6 characters with at least one numeric character.");
            }

            if (!Validator.matches(user.ssn, /^[0-9]{2}[0-1]((?<=0)[1-9]|(?<=1)[0-2])((?<!02)[0-3]|(?<=02)[0-2])((?<=[0-2])[0-9]|(?<=(013|033|053|073|083|103|123))[0-1]|(?<!(013|033|053|073|083|103|123))0)-[0-9]{4}$/)) {
                reason.push("Invalid social security number.");
            }

            if (reason.length) {
                let fullReason = "";

                reason.forEach(reas => {
                    fullReason += reas + " ";
                });
                fullReason = fullReason.slice(0, fullReason.length - 1);

                throw new WError({name: "DataValidationError", info: {message: fullReason}});
            }
            const { _id, firstName, lastName, username, password, email, ssn } = user;
            const createdPerson = await this.setPerson(new PersonDTO(null, firstName, lastName, username, password));
            const createdApplicant = await this.setApplicant(new ApplicantDTO(createdPerson.id, email, ssn));
            return new UserDTO(
                createdPerson.id, 
                createdPerson.firstName, 
                createdPerson.lastName, 
                createdPerson.username, 
                createdPerson.password, 
                createdApplicant.email, 
                createdApplicant.ssn
            );
        } catch (error) {
            throw new WError(
                {
                    cause: error,
                    info: {
                        UserDAO: error.name
                    }
                },
                `Could not create user ${JSON.stringify(user)}.`
            );
       //     throw error;
        }
    }
    async getUser(username,password){
        try{
            return await this.database.transaction(async (t) => {
                const user = await Person.findOne({ where: {username}})
                console.log(user.password, password);
                console.log(user.password == password);

                //if(){
                    //return user
                //}else{throw new Error('invalid password');}

                //return await Applicant.create(applicant, {include: Person, transaction: t});
                //return await Person.create(person, {transaction: t});
            });
        }catch(error){

        }
    }

}
module.exports = UserDAO;


