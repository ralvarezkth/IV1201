'use strict';

/**
 * A DTO representing a user of the recruitment application. 
 */
class PersonDTO {

    /**
     * 
     * @param {integer} id The id of the person. This field is auto-generated and need not be provided. 
     * @param {string} firstName The first name of the person.
     * @param {string} lastName The last name of the person.
     * @param {string} username The username of the person.
     * @param {string} password The password of the person.
     * @param {integer} failedLoginAttempts The number of failed login attempts. This field is used internally and should not be provided.
     * @param {string} createdAt The time when the person was created. 
     *                           This field is auto-generated and need not be provided.
     * @param {string} updatedAt The time when the person was last updated.
     *                           This field is auto-generated and need not be provided.
     * @param {string} deletedAt The time when the person was deleted.
     *                           This field is auto-generated and need not be provided.
     */
    constructor(id, firstName, lastName, username, password, failedLoginAttempts, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.failedLoginAttempts = failedLoginAttempts;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt; 
    }
}

module.exports = PersonDTO;