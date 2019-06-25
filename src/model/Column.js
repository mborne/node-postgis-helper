
const _ = require('lodash');

/**
 * Represents the columns of a table
 */
class Column {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {string} config.type
     * @param {string} [config.required=false]
     */
    constructor(config) {
        /**
         * @property {string} column name
         */
        this.name = _.defaultTo( config.name, null );
        /**
         * @property {string} SQL type
         */
        this.type = _.defaultTo( config.type, null );
        /**
         * @property {boolean} null value allowed
         */
        this.required = _.defaultTo( config.required, false );
    }

}

module.exports = Column;
