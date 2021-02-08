'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

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
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                references: {
                    model: 'Person',
                    key: 'id'
                }
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
            paranoid: true
        });
        return Applicant;
    }
}

module.exports = Applicant;