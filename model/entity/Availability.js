'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class Availability extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        Availability.init({
            application_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            from_date: {
                field: 'from_date',
                type: DataTypes.BIGINT,
                primaryKey: true
            },
            to_date: {
                field: 'to_date',
                type: DataTypes.BIGINT,
                allowNull: false
            }

        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Availability',
            paranoid: false
        });

        return Availability;
    }
}



module.exports = Availability;