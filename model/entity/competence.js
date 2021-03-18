'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various competences relating to an application.
 */
class Competence extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Competence} A sequelize model describing the Competence entity.
     */
    static createModel(sequelize) {
        Competence.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Competence',
            paranoid: false
        });

        return Competence;
    }
}



module.exports = Competence;
