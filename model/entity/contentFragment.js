'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const Content = require('./content');
const Fragment = require('./fragment');

/**
 * The many-to-many mapping between the languages and the actual content.
 */
class ContentFragment extends Model {

    /**
     * 
     * @param {Sequelize} sequelize The sequelize connection instance object
     * @return {ContentFragment} A sequelize model describing the ContentFragment entity.
     */
    static createModel(sequelize) {
        ContentFragment.init({
            contentId: {
                field: 'content_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            fragmentId: {
                field: 'fragment_id',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            value: {
                field: 'value',
                type: DataTypes.TEXT,
                allowNull: false
            },
        }, {
            freezeTableName: true,
            underscored: true,
            sequelize,
            modelName: 'ContentFragment',
            paranoid: false
        });

        return ContentFragment;
    }
}

module.exports = ContentFragment;
