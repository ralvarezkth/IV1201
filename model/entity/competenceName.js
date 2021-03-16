'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The actual name of the Competence in the available languages to dynamically populate the view.
 */
class CompetenceName extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {CompetenceName} A sequelize model describing the CompetenceName entity.
     */
    static createModel(sequelize) {
        CompetenceName.init({
            competence_id: {
                field: 'competence_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            lang_id: {
                field: 'lang_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                field: 'name',
                type: DataTypes.STRING(32),
                allowNull: false
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'CompetenceName',
            paranoid: false
        });

        return CompetenceName;
    }
}



module.exports = CompetenceName;
