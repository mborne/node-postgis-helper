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
     * @param {string} schemaName
     * @param {string} tableName
     * @param {Column[]} columns
     */
    constructor(schemaName,tableName,columns){
        this.schemaName = schemaName;
        this.tableName = tableName;
        this.columns = columns;
    }

}

module.exports = Table;
