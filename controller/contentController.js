'use strict';

const ContentDAO = require('../integration/contentDAO');

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
     * Gets list of available languages (content).
     * 
     * @returns {languages} languages The list of available languages.
     * @throws Throws an exception if unable to fetch a list of available languages from database.
     */
    async getLanguages() { 
        return await this.contentDAO.getLanguages();
    }

    /**
     * Gets dynamic content for the client side view (content).
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