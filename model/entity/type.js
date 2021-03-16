'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various error types the system defines in an end-user friendly format.
 */
class Type extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Type} A sequelize model describing the Type entity.
     */
    static createModel(sequelize) {
        Type.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                field: 'name',
                type: DataTypes.STRING(64),
                allowNull: false
            }
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Type',
            paranoid: false
        });

        return Type;
    }
}



module.exports = Type;
