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
         * @property {string} display name
         */
        this.title = config.title ? config.title : this.name ;
        /**
         * @property {string} content description
         */
        this.description = config.description ? config.description : null ;

        /**
         * @property {Table[]} tables
         */
        this.tables = config.tables ? config.tables : [];
    }

}

module.exports = Schema;