const UserDAO = require('../integration/UserDAO');

class UserController {
    
    /**
     * Creates a new instance of this class and attaches a new UserDAO instance.
     */
    constructor() {
        this.userDAO = new UserDAO();
    }

    /**
     * Creates a new user (applicant).
     * 
     * @param {UserDTO} user The user to be created
     * @returns {UserDTO} createdUser The created user
     */
    async setUser(user) {
        // TODO: validation
        return await this.userDAO.setUser(user);
    }

}
module.exports = UserController;