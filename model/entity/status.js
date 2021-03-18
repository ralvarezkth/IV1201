'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The Status belonging to an application.
 */
class Status extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Status} A sequelize model describing the Status entity.
     */
    static createModel(sequelize) {
        Status.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Status',
            paranoid: false
        });

        return Status;
    }
}



module.exports = Status;
