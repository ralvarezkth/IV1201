'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const ContentFragment = require('./contentFragment');

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
                type: DataTypes.STRING(32),
                allowNull: false
            }
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Fragment',
            paranoid: false
        });

        return Fragment;
    }
}



module.exports = Fragment;
