const Table = require('./Table');

/**
 * Represent an SQL schema with a list of tables
 */
class Schema {

    constructor(config){
        /**
         * @property {string} name of the schema
         */
        this.name   = config.name ? config.name : null;
        /**
         * @property {Table[]} tables
         */
        this.tables = config.tables ? config.tables : [];
    }

}

module.exports = Schema;