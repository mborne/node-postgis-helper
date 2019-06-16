const Column = require('./Column');

/**
 * Represents the schema of a given table
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
