'use strict';

/**
 * A user (applicant) of the recruitment application. 
 */
class UserDTO {

    /**
     * 
     * @param {integer} id The id of the user. This field is auto-generated and need not be provided.
     * @param {string} firstName The first name of the user.
     * @param {string} lastName The last name of the user.
     * @param {string} username The username of the user.
     * @param {string} password The password of the user.
     * @param {string} email The email address of the user.
     * @param {string} dob The date of birth of the user. 
     */
    constructor(id, firstName, lastName, username, password, email, dob) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
    }
}

module.exports = UserDTO;