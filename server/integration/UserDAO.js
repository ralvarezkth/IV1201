'use strict';

const Sequelize = require('sequelize');
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
            console.log(error);
            throw new WError(
                {
                    cause: error,
                    info: {
                        UserDAO: 'The call to authenticate and sync has failed.'
                    }
                },
                'Could not connect to the database.'
            );   
        }
    }

    async setPerson(person) {
        try {
            return await Person.create(person);
        } catch (error) {
            console.log(error);
            throw new WError(
                {
                    cause: error,
                    info: {
                        UserDAO: 'The call to create has failed.'
                    }
                },
                `Could not create person ${JSON.stringify(person)}.`
            );
        }
    }

    async setApplicant(applicant, options) {
        console.log("apper", applicant, options)
        try { 
            return await Applicant.create(applicant, options);
        } catch (error) {
            console.log(error);
            throw new WError(
                {
                    cause: error,
                    info: {
                        UserDAO: 'The call to create has failed.'
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
        const { _id, firstName, lastName, username, password, email, dob } = user;
        const createdPerson = await this.setPerson(new PersonDTO(null, firstName, lastName, username, password));
        const createdApplicant = await this.setApplicant(
            new ApplicantDTO(createdPerson.id, email, dob), 
            {include: Person}
        );
        return new UserDTO(
            createdPerson.id, 
            createdPerson.firstName, 
            createdPerson.lastName, 
            createdPerson.username, 
            createdPerson.password, 
            createdApplicant.email, 
            createdApplicant.dob
        );
    }

}
module.exports = UserDAO;


