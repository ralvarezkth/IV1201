'use strict';

const ApplicationDAO = require('../integration/applicationDAO');

class ApplicationController {
    
    /**
     * Creates a new instance of this class and attaches a new ContentDAO instance.
     * Upon creation the ContentDAO instance will attempt to connect to the database.
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.applicationDAO = new ApplicationDAO();
    }

    /**
     * Gets list of available languages (content).
     * 
     * @returns {languages} languages The list of available languages.
     * @throws Throws an exception if unable to fetch a list of available languages from database.
     */
    async getApplication(id) { 
        return await this.applicationDAO.getApplication(id);
    }

    /**
     * Gets list of available languages (content).
     * 
     * @returns {languages} languages The list of available languages.
     * @throws Throws an exception if unable to fetch a list of available languages from database.
     */
    async getApplications() { 
        return await this.applicationDAO.getApplications();
    }

    async updateApplication(application) {
        return await this.applicationDAO.updateApplication(application);
    }

}
module.exports = ApplicationController;