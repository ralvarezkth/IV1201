'use strict';

/**
 * A type of user of the recruitment application 
 */
class ApplicantDTO {

    /** TODO:
     * 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {string} ssn 
     * @param {bigint} dob 
     * @param {string} createdAt 
     * @param {string} updatedAt 
     * @param {string} deletedAt 
     */
    constructor(id, email, ssn, dob, createdAt, updatedAt, deletedAt) {
        //TODO: validation
        this.id = id;
        this.email = email;
        this.ssn = ssn;
        this.dob = dob;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

}
module.exports = ApplicantDTO;