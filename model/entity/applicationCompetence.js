'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class ApplicationCompetence extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        ApplicationCompetence.init({
            application_id: {
                field: 'application_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            competence_id: {
                field: 'competence_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            duration_id: {
                field: 'duration_id',
                type: DataTypes.INTEGER,
                allowNull: false
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'ApplicationCompetence',
            paranoid: false
        });

        return ApplicationCompetence;
    }
}



module.exports = ApplicationCompetence;
