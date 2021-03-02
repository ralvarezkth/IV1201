'use strict';

const UserDAO = require('../integration/userDAO');

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
     * Creates a new user (applicant).
     * 
     * @param {UserDTO} user The user to be created.
     * @returns {UserDTO} createdUser The created user.
     * @throws Throws an exception if unable to create the specified user.
     */
    async setUser(user) {   
        return await this.userDAO.setUser(user);
    }

    /**
     * Gets the user (person) with matching username and password.
     *
     * @param username The username to be found in the database.
     * @param password The password to be checked if matching he one in the database.
     * @returns {Promise<*>} The user with matching username and password.
     */
    async getUser(username,password) {   
        return await this.userDAO.getUser(username,password);
    }

    /**
     * Gets the applicant (person) which person id matches parameter id.
     *
     * @param id The applicant person id to be looked for in the database.
     * @returns {Promise<*>} The applicant with person id matching parameter id.
     */
    async getApplicant(id) {
        return await this.userDAO.getApplicant(id);
    }
}
module.exports = UserController;