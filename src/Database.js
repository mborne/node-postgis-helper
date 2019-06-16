const debug = require('debug')('postgis-helper');

const { Client } = require('pg');

const pool = require('./internal/pool');
const psql = require('./internal/psql');

const Catalog = require('./Catalog');

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

