'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class Recruiter extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        Recruiter.init({
            person_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Recruiter',
            paranoid: false
        });

        return Recruiter;
    }
}



module.exports = Recruiter;
