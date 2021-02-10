'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const Person = require('./Person');

/**
 * A type of user of the recruitment application 
 */
class Applicant extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Applicant} A sequelize model describing the Applicant entity.
     */
    static createModel(sequelize) {
        Applicant.init({
            person_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING, // TODO: what is a suitable datatype for this column?
                allowNull: false
            },
            ssn: {
                type: DataTypes.STRING, // TODO: what is a suitable datatype for this column?
                allowNull: false
            },
            dob: {
                type: DataTypes.BIGINT, // TODO: what is a suitable datatype for this column?
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