const debug = require('debug')('postgis-helper');

const { Client } = require('pg');
const pool = require('./pool');

const psql = require('./internal/psql');

/**
 * Helper to query database
 */
class Database {

    /**
     * See Database.createDatabase()
     * @private
     * @param {Client} client
     */
    constructor(client) {
        /**
         * @property {Client}
         */
        this.client = client;
    }

    /**
     * Create database instance
     *
     * @return {Database}
     */
    static async createDatabase(){
        debug('Database - create pg connection...');
        let client = await pool.connect();
        return new Database(client);
    }

    /**
     * @returns {Client}
     */
    getClient(){
        return this.client;
    }

    /**
     * Close database connexion
     */
    async close(){
        debug('Database - release pg connection...');
        await this.client.release();
    }

    /**
     * Execute query
     * @param {string} sql
     * @param {any[]} values
     * @return {Object[]}
     */
    async query(sql, values) {
        const res = await this.client.query(sql, values)
        return res.rows;
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
     * List schemas
     */
    async getSchemaNames() {
        const sql = `select schema_name from information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'`;
        const rows = await this.query(sql);
        return rows.map(function (row) { return row.schema_name });
    }

    /**
     * List table in a given schema
     * @param {String} schemaName
     */
    async getTableNames(schemaName) {
        const sql = `SELECT * FROM pg_catalog.pg_tables WHERE schemaname = $1`;
        const rows = await this.query(sql, [schemaName]);
        return rows.map(function (row) { return row.tablename });
    }

    /**
     * Execute SQL file with psql
     * @param {String} sqlPath
     */
    async batch(sqlPath){
        return psql({
            inputPath: sqlPath
        });
    }

}

module.exports = Database;
