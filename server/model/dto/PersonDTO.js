'use strict';

/**
 * A base user of the recruitment application 
 */
class PersonDTO {

    /**
     * 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} username 
     * @param {string} password 
     * @param {string} createdAt 
     * @param {string} updatedAt 
     * @param {string} deletedAt 
     */
    constructor(firstName, lastName, username, password) {
        // TODO: validation
        this.first_name = firstName;
        this.last_name = lastName;
        this.username = username;
        this.password = password;
        /*
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        */
    }
}

module.exports = PersonDTO;