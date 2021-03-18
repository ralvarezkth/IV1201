'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * Error feedback to be provided to the end user upon malfunction.
 */
class ErrorFeedback extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {ErrorFeedback} A sequelize model describing the ErrorFeedback entity.
     */
    static createModel(sequelize) {
        ErrorFeedback.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lang_id: {
                field: 'lang_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type_id: {
                field: 'type_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            message_id: {
                field: 'message_id',
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'ErrorFeedback',
            paranoid: false
        });

        return ErrorFeedback;
    }
}



module.exports = ErrorFeedback;
