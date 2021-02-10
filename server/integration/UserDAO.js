'use strict';

const Sequelize = require('sequelize');
const Person = require('../model/entity/Person');
const PersonDTO = require('../model/dto/PersonDTO');
const Applicant = require('../model/entity/Applicant');
const ApplicantDTO = require('../model/dto/ApplicantDTO');
const UserDTO = require('../model/dto/UserDTO');

/**
 * This class handles all user-specific communication with the database.
 */
class UserDAO {

    /**
     * Creates a new instance of this class and initializes the database connection.
     * Initialization creates the model entities and the required database tables 
     * if they are non-existent. 
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
        try {
            this.initialize();
        } catch (error) {
            //TODO: proper error handling
            console.log(error);
        } 
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
            throw(error);   
        }
    }

    async setPerson(person) {
        try {
            return await Person.create(person);
        } catch (error) {
            throw(error);
        }
    }

    async findPersonById() {}

    async deletePersonById(id) {
        try {
            return await Person.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw(error);
        }
    }

    async setApplicant(applicant, options) {
        console.log("apper", applicant, options)
        try { 
            return await Applicant.create(applicant, options);
        } catch (error) {
            throw(error);
        }
    }

    async findApplicantById(){}

    async deleteApplicantById(){}


    /**
     * Stores a new user (applicant) in the database.
     * 
     * @param {UserDTO} user The user to be created
     * @returns {UserDTO} createdUser The created user
     */
    async setUser(user) {
        try {
            // TODO: validation
            const { _id, firstName, lastName, username, password, email, ssn, dob } = user;
            const createdPerson = await this.setPerson(new PersonDTO(null, firstName, lastName, username, password));
            const createdApplicant = await this.setApplicant(
                new ApplicantDTO(createdPerson.id, email, ssn, dob),
                {include: Person}
            );
            return new UserDTO(
                createdPerson.id, 
                createdPerson.firstName, 
                createdPerson.lastName, 
                createdPerson.username, 
                createdPerson.password, 
                createdApplicant.email, 
                createdApplicant.ssn, 
                createdApplicant.dob
            );
        } catch (error) {
            // TODO: proper error handling
            console.log(error);
        }
    }

    
    async findUserById(id){}

    async deleteUserById(id){}

}
module.exports = UserDAO;


