const debug = require('debug')('postgis-helper');

const { Client, QueryConfig } = require('pg');

const pool = require('./internal/pool');
const psql = require('./internal/psql');

const Catalog = require('./Catalog');
const Table = require('./models/Table');

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
        /**
         * @property {Catalog}
         * @private
         */
        this.catalog = new Catalog(this);
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
     * Close database connexion
     */
    async close(){
        debug('Database - release pg connection...');
        await this.client.release();
    }

    /**
     * @returns {Client}
     */
    getClient(){
        return this.client;
    }

    /**
     * @returns {Catalog}
     */
    getCatalog(){
        return this.catalog;
    }

    /**
     * Execute query
     * @param {string|QueryConfig} query
     * @param {any[]} [values]
     * @return {Object[]}
     */
    async query(query, values) {
        //debug(query);
        const res = await this.client.query(query, values)
        return res.rows;
    }

    /**
     * Test if schema exists
     * @param {string} schemaName
     * @returns {boolean}
     */
    async hasSchema(schemaName){
        return this.catalog.hasSchema(schemaName);
    }

    /**
     * List schemas
     * @returns {string[]}
     */
    async getSchemaNames() {
        return this.catalog.getSchemaNames();
    }

    /**
     * List table in a given schema
     * @param {string} schemaName
     * @returns {string[]}
     */
    async getTableNames(schemaName) {
        return this.catalog.getTableNames(schemaName);
    }

    /**
     * Get tables with primaryKey, columns and constraints
     * @param {string} schemaName
     * @return {Table[]}
     */
    async getSchema(schemaName){
        return this.catalog.getSchema(schemaName);
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

