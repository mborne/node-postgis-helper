const Column = require('./Column');

const _ = require('lodash');

/**
 *
 * Model describing a ForeignKey for a given table
 *
 * @typedef {object} ForeignKey
 * @property {string} name foreign key name
 * @property {string[]} columns source columns
 * @property {object} target
 * @property {string} target.schema target table schema
 * @property {string} target.name target table name
 * @property {string[]} target.columns target columns
 */


/**
 * Model describing an SQL table
 */
class Table {

    /**
     * @param {object} config
     * @param {string} config.schema
     * @param {string} config.name
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string[]} config.primaryKey
     * @param {Column[]} config.columns
     * @param {ForeignKey[]} config.foreignKeys
     * @param {object} [config.tags={}]
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
         * @property {string} display name
         */
        this.title = _.defaultTo( config.title, config.name ) ;
        /**
         * @property {string} content description
         */
        this.description = _.defaultTo( config.description, null ) ;
        /**
         * @property {Column[]} columns
         */
        this.columns = _.defaultTo( config.columns, [] ) ;
        /**
         * @property {string[]} columns composing primary key
         */
        this.primaryKey = _.defaultTo( config.primaryKey, [] );
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
