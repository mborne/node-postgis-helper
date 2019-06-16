const debug = require('debug')('postgis-helper');

const Database = require('./Database');
const Column   = require('./model/Column');
const Table    = require('./model/Table');

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
        const sql = `select schema_name from information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'`;
        let rows = await this.database.query(sql);
        return rows.map(function (row) { return row.schema_name });
    }

    /**
     * Get table names for a given schema
     */
    async getTableNames(schemaName){
        debug(`Catalog.getTableNames(${schemaName})...`);
        const sql = `SELECT * FROM pg_catalog.pg_tables WHERE schemaname = $1`;
        let rows = await this.database.query(sql, [schemaName]);
        return rows.map(function (row) { return row.tablename });
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
        const sql =
`
SELECT
    a.attname as name,
    format_type(a.atttypid, a.atttypmod) AS type,
    (a.attnotnull = false) as is_nullable,
    (
        select count(*) from pg_catalog.pg_index i
        where a.attrelid = i.indrelid
        and a.attnum = ANY(i.indkey)
        and i.indisprimary
    ) = 1 as is_primary
from pg_attribute a
    where a.attrelid = ($1 ||'.' || $2)::regclass
    and a.attnum > 0
`;
        return this.database.query(sql,[schemaName,tableName]).then(function(rows){
            return rows.map(row => {
                return Column.createColumn(row);
            });
        });
    }

}

module.exports = Catalog;
