const DBHandler = require('../integration/DBHandler');
const ApplicantDTO = require('../model/dto/ApplicantDTO');
const PersonDTO = require('../model/dto/PersonDTO');

class UserController {
    /**
     * Creates a new instance
     */
    constructor() {
        this.dbHandler = new DBHandler();
    }

    /** TODO:
     * 
     * @param {PersonDTO} person
     * @param {ApplicantDTO} applicant
     * @return {Object[]} PersonDTO, ApplicantDTO - An array containing a personDTO and an applicantDTO
     */
    async setUser({ firstName, lastName, username, password, email, ssn, dob}) {
        // TODO: validation
        const newPerson = new PersonDTO(firstName, lastName, username, password);
        const newApplicant = new ApplicantDTO(email, ssn, dob);
        return await this.dbHandler.setUser(newPerson, newApplicant);
    }




}
module.exports = UserController;