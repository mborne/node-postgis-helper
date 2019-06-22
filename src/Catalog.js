const debug = require('debug')('postgis-helper');

const _ = require('lodash');

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
        let query = await helper.getQueryListTables(schemaName);
        let rows = await this.database.query(query);
        return rows.map(function(row){
            return row.table;
        });
    }

    /**
     * Get table for a given schema
     *
     * @param {string} schemaName filter according to a given schema
     * @param {object} options
     * @param {boolean} [options.withColumns=true] retrieve columns for each table
     */
    async getTables(schemaName,options){
        debug(`Catalog.getTables(${JSON.stringify(options)})`);

        options = _.defaults({
            withColumns: true
        },options);

        let rows = await this.database.query(
            helper.getQueryListTables(schemaName)
        );
        let tables = rows.map(function(row){
            return new Table({
                schema: row.schema,
                name: row.table
            });
        });

        /* retrieve table properties */
        for ( var i in tables ){
            let table = tables[i];
            if ( options.withColumns ){
                table.columns = await this.getColumns(table.schema,table.name);
            }
        }

        return tables;
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
