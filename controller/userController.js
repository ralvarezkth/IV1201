'use strict';

const UserDAO = require('../integration/userDAO');
const Person = require('../model/entity/person');
const Applicant = require('../model/entity/applicant');

class UserController {
    
    /**
     * Creates a new instance of this class and attaches a new UserDAO instance.
     * Upon creation the UserDAO instance will attempt to connect to the database.
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.userDAO = new UserDAO();
    }

    /**
     * Creates a new applicant type user in the database.
     * 
     * @param {UserDTO} user The user to be created.
     * @returns {UserDTO} createdUser The created user.
     * @throws Throws an exception if unable to create the specified user.
     */
    setUser(user) {   
        return this.userDAO.setUser(user);
    }

    /**
     * Retrieves a user with matching username and password.
     *
     * @param {string} username The username to be found in the database.
     * @param {string} password The password to be checked if matching he one in the database.
     * @returns {Person} The user with matching username and password.
     */
    getUser(username, password) {   
        return this.userDAO.getUser(username,password);
    }

    /**
     * Retrieves a user of type applicant by matching the parameter id.
     *
     * @param {integer} id The applicant person id to be searched for in the database.
     * @returns {Applicant} The applicant with person id matching the parameter id.
     */
    getApplicant(id) {
        return this.userDAO.getApplicant(id);
    }
    async getRole(id) {  
        return await this.userDAO.getRole(id);
    }

}
module.exports = UserController;