const Column = require('./Column');

const _ = require('lodash');

/**
 * Model for foreign keys
 * @typedef {object} ForeignKey
 * @property {string} name foreign key name
 * @property {string[]} columns source columns
 * @property {object} target
 * @property {string} target.schema target table schema
 * @property {string} target.name target table name
 * @property {string[]} target.columns target columns
 */


/**
 * Represents the schema of a given table
 */
class Table {

    /**
     * @param {object} config
     * @param {string} config.schema
     * @param {string} config.name
     * @param {Column[]} config.columns
     * @param {string[]} config.primaryKey
     * @param {ForeignKey[]} config.foreignKeys
     * @param {object} config.tags
     */
    constructor(config){
        /**
         * @property {string} schema name
         */
        this.schema = _.defaultTo( config.schema, null ) ;
        /**
         * @property {string} table name
         */
        this.name  = _.defaultTo( config.name, null ) ;
        /**
         * @property {string[]} columns composing primary key
         */
        this.primaryKey = _.defaultTo( config.primaryKey, [] );
        /**
         * @property {Column[]} columns
         */
        this.columns = _.defaultTo( config.columns, [] ) ;
        /**
         * @property {ForeignKey[]} foreign keys
         */
        this.foreignKeys = _.defaultTo( config.foreignKeys, [] ) ;
        /**
         * @property {object} application specific properties
         */
        this.tags = _.defaultTo( config.tags, {} );
    }

}

module.exports = Table;
