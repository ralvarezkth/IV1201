'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The base of a user of the recruitment application 
 */
class Person extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Person} A sequelize model describing the Person entity.
     */
    static createModel(sequelize) {
        Person.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false 
            },
            failedLoginAttempts: {
                field: 'failed_login_attempts',
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Person',
            paranoid: false
        });
        return Person;
    }
}

module.exports = Person;