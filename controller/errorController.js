'use strict';

const ErrorDAO = require('../integration/errorDAO');

class ErrorController {
    
    /**
     * Creates a new instance of this class and attaches a new ContentDAO instance.
     * Upon creation the ContentDAO instance will attempt to connect to the database.
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.errorDAO = new ErrorDAO();
    }

    /**
     * Gets dynamic content for the client side view (content).
     * 
     * @param {integer} id The id of the active language.
     * @returns {ContentDTO} content The actual content of the active language.
     * @throws Throws an exception if unable to fetch linguistic content from database.
     */
    async getError(name) { 
        return await this.errorDAO.getError(name);
    }

}
module.exports = ErrorController;