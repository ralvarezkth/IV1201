'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The Status name in the different available languages to dynamically populate the view.
 */
class StatusName extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {StatusName} A sequelize model describing the StatusName entity.
     */
    static createModel(sequelize) {
        StatusName.init({
            status_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            lang_id: {
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
            modelName: 'StatusName',
            paranoid: false
        });

        return StatusName;
    }
}



module.exports = StatusName;
