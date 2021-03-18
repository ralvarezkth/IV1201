'use strict';

/**
 * Linguistic (content) to populate the client side view of the application. 
 */
class ApplicationDTO {

    /**
     * 
     * @param {integer} id The id of the language. This field is auto-generated and need not be provided.
     * @param {string} menuHome The content of the home link.
     * @param {string} menuLogin The content of the login link.
     * @param {string} menuRegister The content of the registration link.
     * @param {string} menuApply The content of the apply link.
     */
    constructor(id, competence, availability, version, statusId, status) {
        this.id = id;
        this.competence = competence;
        this.availability = availability;
        this.version = version;
        this.statusId = statusId;
        this.status = status;
    }
}

module.exports = ApplicationDTO;
