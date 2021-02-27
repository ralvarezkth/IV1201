'use strict';

const ContentDAO = require('../integration/ContentDAO');

class ContentController {
    
    /**
     * Creates a new instance of this class and attaches a new ContentDAO instance.
     * Upon creation the ContentDAO instance will attempt to connect to the database.
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.contentDAO = new ContentDAO();
    }

    /**
     * Creates a new user (applicant).
     * 
     * @param {integer} id The id of the active language.
     * @returns {ContentDTO} content The actual content of the active language.
     * @throws Throws an exception if unable to fetch linguistic content from database.
     */
    async getContent(id) {   
        return await this.contentDAO.getContent(id);
    }

}
module.exports = ContentController;