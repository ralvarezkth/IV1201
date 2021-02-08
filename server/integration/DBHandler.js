const Sequelize = require('sequelize');
const Person = require('../model/entity/Person');
const Applicant = require('../model/entity/Applicant');
const PersonDTO = require('../model/dto/PersonDTO');

/**
 * This class handles all communication with the database
 */
class DBHandler {
    /**
     * Creates a new instance of this class
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
        Person.createModel(this.database);
        Applicant.createModel(this.database);
    }

    /**
     * Creates missing tables in the database
     */
    async createTables() {
        try {
            await this.database.authenticate();
            await this.database.sync();
        } catch (error) {
            //TODO: proper error handling
            // logger?
            console.log(error); 
        }
    }

    // TODO: javadoc & fix method 
    async setUser(person, applicant) {
        try {
            // TODO: validation
            const { firstName, lastName, username, password } = person;
            const { email, ssn, dob } = applicant;
             
            const savedPerson = await Person.create({ first_name: firstName, last_name: lastName, username: username, password: password });
            const savedApplicant = await Applicant.create({ email: email, ssn: ssn, dob: dob });
            return [savedPerson, savedApplicant];
        } catch (error) {
            // TODO: proper error handling
            // logger?
            console.log(error);
        }
    }

}
module.exports = DBHandler;


