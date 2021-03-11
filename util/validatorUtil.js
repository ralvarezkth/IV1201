'use strict';

const Validator = require('validator');
const UserDTO = require('../model/dto/userDTO');

/**
 * This utility class is used to validate and sanitize input before use. 
 */
class ValidatorUtil {

    constructor() {}

    validationErrors(reason) {
        let fullReason = "";
        reason.forEach(reas => { fullReason += reas + " "; });
        fullReason = fullReason.slice(0, fullReason.length - 1);
        return fullReason;  
    }

    /**
     * Validates the provided id, checking for null or non integer values. 
     * 
     * @param {integer} id The user's provided id. 
     * @returns {Object|integer} Returns an object containing the validation errors as Object.error or
     *                           the validated id.
     */
    validateUserId(id) {
        let reason = [];

        if (id == null) {
            reason.push("Invalid id; null values are not allowed");
        }
        if (!Number.isInteger(id)) {
            reason.push("Invalid id; non integer values are not allowed");
        }
        
        return reason.length ? {error: this.validationErrors(reason)} : id;
    }

    /**
     * Validates the provided username and password, checking if they are empty.
     * The username is also sanitized. 
     * 
     * @param {string} username The user's provided username. 
     * @param {string} password The user's provided password.
     * @returns {Object|string} Returns an object containing the validation errors as Object.error or
     *                          the validated and sanitized username.
     */
    validateUserLogin(username, password) {
        let reason = [];

        if (Validator.isEmpty(username)) {
            reason.push("Invalid username; empty values are not allowed.");
        }
        if (Validator.isEmpty(password)) {
            reason.push("Invalid password; empty values are not allowed.");
        }
        username = Validator.escape(username);
        username = Validator.trim(username);
        username = Validator.stripLow(username);

        return reason.length ? {error: this.validationErrors(reason)} : username;
    }

    
    /**
     * Validates and sanitizes the values in the provided UserDTO instance.
     * 
     * @param {UserDTO} user The UserDTO instance to be validated and sanitized.
     * @returns {Object|UserDTO} Returns an object containing the validation errors as Object.error or
     *                           the validated and sanitized UserDTO instance.
     */
    validateNewUser(user) {
        let reason = [];
        let keys = Object.keys(user);
        keys.splice(keys.indexOf("id"), 1);

        keys.forEach(key => {
            user[key] = Validator.escape(user[key]);
            user[key] = Validator.ltrim(user[key]);
            user[key] = Validator.rtrim(user[key]);
            user[key] = Validator.stripLow(user[key]);
        });

        if (!Validator.matches(user.firstName, /^[a-zA-Z\\s\-]+$/) || !Validator.matches(user.lastName, /^[a-zA-Z\\s\-]+$/)) {
            reason.push("Invalid name format; alphabetic characters as well as space and dash allowed.");
        }

        if (!Validator.isEmail(user.email)) {
            reason.push("Invalid email format; address@domain.com etc.");
        }
        user.email = Validator.normalizeEmail(user.email,
            {all_lowercase: true, gmail_remove_dots: true, gmail_remove_subaddress: true,
            gmail_convert_googlemaildotcom: true, outlookdotcom_remove_subaddress: true,
            yahoo_remove_subaddress: true, icloud_remove_subaddress: true});

        if (!Validator.isStrongPassword(user.password, {minLength: 6, minNumbers: 1, minUppercase: 0, minSymbols: 0})) {
            reason.push("Invalid password; minimum length 6 characters with at least one numeric character.");
        }

        if (!Validator.matches(user.ssn, /^[0-9]{2}[0-1]((?<=0)[1-9]|(?<=1)[0-2])((?<!02)[0-3]|(?<=02)[0-2])((?<=[0-2])[0-9]|(?<=(013|033|053|073|083|103|123))[0-1]|(?<!(013|033|053|073|083|103|123))0)-[0-9]{4}$/)) {
            reason.push("Invalid social security number; try again (YYMMDD-XXXX)");
        }

        return reason.length ? {error: this.validationErrors(reason)} : user;
    }

}
module.exports = ValidatorUtil;