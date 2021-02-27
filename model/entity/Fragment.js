'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The many-to-many mapping between the languages and the actual content.
 */
class Fragment extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Fragment} A sequelize model describing the Fragment entity.
     */
    static createModel(sequelize) {
        Fragment.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            underscored: true,
            sequelize,
            modelName: 'Fragment',
            paranoid: false
        });

        return Fragment;
    }
}

module.exports = Fragment;