'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * The specific error message belonging to an Error of a specified language and type.
 */
class Message extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {Message} A sequelize model describing the Message entity.
     */
    static createModel(sequelize) {
        Message.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            content: {
                field: 'content',
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'Message',
            paranoid: false
        });

        return Message;
    }
}



module.exports = Message;
