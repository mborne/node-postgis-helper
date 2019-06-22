const Column = require('./Column');

/**
 * Represents the schema of a given table
 *
 * TODO rename schemaName to schema and tableName to table
 * TODO add primaryKey string|string[]
 * TODO constructor with a JSON config
 */
class Table {

    /**
     * @param {object} config
     * @param {string} config.schema
     * @param {string} config.name
     * @param {Column[]} config.columns
     */
    constructor(config){
        /**
         * @property {string} schema name
         */
        this.schema = config.schema ;
        /**
         * @property {string} table name
         */
        this.name  = config.name ;
        /**
         * @property {string|string[]} primary key
         */
        this.primaryKey = config.primaryKey;
        /**
         * @property {boolean} true if table is a view
         */
        this.is_view = config.is_view;
        /**
         * @property {Column[]} columns
         */
        this.columns = config.columns ;
    }

}

module.exports = Table;
