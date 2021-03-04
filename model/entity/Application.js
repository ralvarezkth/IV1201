'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class Application extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        Application.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            person_id: {
                field: 'person_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status_id: {
                field: 'status_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            version: {
                field: 'version',
                type: DataTypes.INTEGER,
                allowNull: false
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Application',
            paranoid: false
        });

        return Application;
    }
}



module.exports = Application;