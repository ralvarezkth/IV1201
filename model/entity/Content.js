'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The various languages to dynamically populate the view.
 */
class Content extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Content} A sequelize model describing the Content entity.
     */
    static createModel(sequelize) {
        Content.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lang: {
                field: 'lang',
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            underscored: true,
            sequelize,
            modelName: 'Content',
            paranoid: false
        });

        return Content;
    }
}

module.exports = Content;