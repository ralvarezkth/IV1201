'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 *  This class represents a log entry entity 
 */
class LogEntry extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {LogEntry} A sequelize model describing the LogEntry entity.
     */
    static createModel(sequelize) {
        LogEntry.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            event: {
                type: DataTypes.STRING(2000),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'LogEntry',
            paranoid: false
        });
        return LogEntry;
    }
}

module.exports = LogEntry;