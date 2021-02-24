'use strict';

const UserDAO = require('../integration/UserDAO');

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

    async getUser(username,password) {   
        return await this.userDAO.getUser(username,password);
    }

}
module.exports = UserController;