'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const Person = require('./person');

/**
 * An Applicant entity representing an applicant user type of the recruitment application. 
 */
class Applicant extends Model {

    /**
     * 
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return {Applicant} A sequelize model describing the Applicant entity.
     */
    static createModel(sequelize) {
        Applicant.init({
            personId: {
                field: 'person_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            ssn: {
                type: DataTypes.STRING, 
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Applicant',
            paranoid: false
        });
        Applicant.belongsTo(Person, {foreignKey: 'person_id'});
        return Applicant;
    }
}

module.exports = Applicant;