'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class Competence extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        Competence.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            modelName: 'Competence',
            paranoid: false
        });

        return Competence;
    }
}



module.exports = Competence;
