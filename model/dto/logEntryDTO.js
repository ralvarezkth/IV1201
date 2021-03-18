'use strict';

/**
 * A DTO representing a log entry in the log.
 */
class LogEntryDTO {

    /**
     * 
     * @param {integer} id The id of the log entry. This field is auto-generated and need not be provided. 
     * @param {string} event The event to be logged.
     * @param {string} createdAt The time when the log entry was created. 
     *                           This field is auto-generated and need not be provided.
     * @param {string} updatedAt The time when the log entry was last updated.
     *                           This field is auto-generated and need not be provided.
     * @param {string} deletedAt The time when the log entry was deleted.
     *                           This field is auto-generated and need not be provided.
     */
    constructor(id, event, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.event = event;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt; 
    }
}

module.exports = LogEntryDTO;