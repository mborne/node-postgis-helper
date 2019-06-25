
const _ = require('lodash');

/**
 * Model describing a column of an SQL table.
 */
class Column {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string} config.type
     * @param {string} [config.required=false]
     * @param {object} [config.tags={}]
     */
    constructor(config) {
        /**
         * @property {string} column name
         */
        this.name = _.defaultTo( config.name, null );
        /**
         * @property {string} display name
         */
        this.title = _.defaultTo( config.title, config.name ) ;
        /**
         * @property {string} content description
         */
        this.description = _.defaultTo( config.description, null ) ;
        /**
         * @property {string} type native SQL type
         */
        this.type = _.defaultTo( config.type, null );
        /**
         * @property {boolean} value required
         */
        this.required = _.defaultTo( config.required, false );
        /**
         * @property {object} application specific properties
         */
        this.tags = _.defaultTo( config.tags, {} );
    }

}

module.exports = Column;
