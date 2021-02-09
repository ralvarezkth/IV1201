'use strict';

/**
 * A user (applicant) of the recruitment application 
 */
class UserDTO {

    constructor(id, firstName, lastName, username, password, email, ssn, dob) {
        // TODO: validation
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.ssn = ssn;
        this.dob = dob;
        
    }
}

module.exports = UserDTO;