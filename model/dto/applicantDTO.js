'use strict';

/**
 * A DTO representing an applicant user type of the recruitment application. 
 */
class ApplicantDTO {

    /**
     * 
     * @param {integer} id The id of the applicant. This field is auto-generated and need not be provided.
     * @param {string} email The email address of the applicant.
     * @param {string} ssn The social security number of the applicant.
     * @param {string} createdAt The time when the applicant was created. 
     *                           This field is auto-generated and need not be provided.
     * @param {string} updatedAt The time when the applicant was last updated.
     *                           This field is auto-generated and need not be provided.
     * @param {string} deletedAt The time when the applicant was deleted.
     *                           This field is auto-generated and need not be provided.
     */
    constructor(id, email, ssn, createdAt, updatedAt, deletedAt) {
        this.personId = id;
        this.email = email;
        this.ssn = ssn;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;  
    }

}
module.exports = ApplicantDTO;