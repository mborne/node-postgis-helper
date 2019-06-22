const debug = require('debug')('postgis-helper');

const Database = require('./Database');
const Column   = require('./model/Column');
const Table    = require('./model/Table');

const helper = require('./helper');

/**
 * Helper to Databaseget information about PostgreSQL schema
 */
class Catalog {

    /**
     * See Database.getCatalog()
     * @private
     * @param {Database} database
     */
    constructor(database) {
        /**
         * @property {Database}
         */
        this.database = database;
    }

    /**
     * Test if schema exists
     * @param {string} schemaName
     * @returns {boolean}
     */
    async hasSchema(schemaName){
        let schemas = await this.getSchemaNames();
        return schemas.indexOf(schemaName) >= 0;
    }

    /**
     * List schema names
     * @return {string[]}
     */
    async getSchemaNames() {
        debug('Catalog.getSchema()...');
        let query = helper.getQueryListSchema();
        let rows = await this.database.query(query);
        return rows.map(function (row) { return row.schema_name });
    }

    /**
     * Get table names for a given schema
     */
    async getTableNames(schemaName){
        debug(`Catalog.getTableNames(${schemaName})...`);
        let query = helper.getQueryListTables(schemaName);
        let rows = await this.database.query(query);
        return rows.map(function (row) { return row.name });
    }

    /**
     * Get table by schemaName and tableName
     * @param {string} schemaName
     * @param {string} tableName
     */
    async getTable(schemaName, tableName){
        debug(`Catalog.getTable(${schemaName}, ${tableName})...`);
        let columns = await this.getColumns(schemaName,tableName);
        return new Table(schemaName,tableName,columns);
    }

    /**
     * Get columns from table
     * @param {string} schemaName
     * @param {string} tableName
     * @return {Column[]}
     */
    async getColumns(schemaName,tableName){
        debug(`Catalog.getColumns(${schemaName}, ${tableName})...`);
        let query = helper.getQueryListColumns(schemaName,tableName);
        return this.database.query(query).then(function(rows){
            return rows.map(row => {
                return Column.createColumn(row);
            });
        });
    }

}

module.exports = Catalog;
