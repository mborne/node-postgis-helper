const debug = require('debug')('postgis-helper');

const _ = require('lodash');

const Database = require('./Database');
const Column   = require('./models/Column');
const Table    = require('./models/Table');

const queries = require('./queries');
const parseForeignKey = require('./internal/parseForeignKey');

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
        let query = queries.getQueryListSchema();
        let rows = await this.database.query(query);
        return rows.map(function (row) { return row.schema_name });
    }

    /**
     * Get table names for a given schema
     */
    async getTableNames(schemaName){
        debug(`Catalog.getTableNames(${schemaName})...`);
        let query = await queries.getQueryListTables(schemaName);
        let rows = await this.database.query(query);
        return rows.map(function(row){
            return row.table;
        });
    }

    /**
     * Get description for a given schema
     *
     * @param {string} schemaName filter according to a given schema
     */
    async getTables(schemaName){
        debug(`Catalog.getTables(${schemaName})`);

        let rows = await this.database.query(
            queries.getQueryListTables(schemaName)
        );
        let tables = await Promise.all(rows.map(async function(row){
            let primaryKey  = await this.getPrimaryKey(row.schema,row.table);
            let columns     = await this.getColumns(row.schema,row.table);
            let foreignKeys = await this.getForeignKeys(row.schema,row.table);

            return new Table({
                schema: row.schema,
                name: row.table,
                primaryKey: primaryKey,
                columns: columns,
                foreignKeys: foreignKeys,
                is_view: row.is_view
            });
        }.bind(this)));
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
        let query = queries.getQueryListColumns(schemaName,tableName);
        return this.database.query(query).then(function(rows){
            return rows.map(row => {
                return new Column({
                    name: row.name,
                    type: row.type,
                    required: ! row.is_nullable
                });
            });
        });
    }

    /**
     * Retrieve primary key for a given table
     * @param {string} schemaName
     * @param {string} tableName
     */
    async getPrimaryKey(schemaName,tableName){
        debug(`Catalog.getPrimaryKey(${schemaName}, ${tableName})...`);
        let query = queries.getQueryPrimaryKey(schemaName,tableName);
        let rows = await this.database.query(query);
        let columns = rows.map(function(row){
            return row.column;
        });
        return columns;
    }

    /**
     * Retrieve foreign keys for a table
     * @param {string} schemaName
     * @param {string} tableName
     */
    async getForeignKeys(schemaName,tableName){
        debug(`Catalog.getForeignKeys(${schemaName}, ${tableName})...`);
        let query = queries.getQueryForeignKey(schemaName,tableName);
        let rows = await this.database.query(query);

        /* parse foreign keys */
        return rows.map(row => {
            return parseForeignKey(row)
        });
    }
}

module.exports = Catalog;
