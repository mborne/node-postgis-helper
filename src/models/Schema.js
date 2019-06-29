const Model = require('./Model');
const Table  = require('./Table');

/**
 * Represent an SQL schema with a list of tables
 */
class Schema extends Model {

    constructor(config){
        super(config);

        /**
         * @property {Table[]} tables
         */
        this.tables = config.tables ? config.tables : [];
    }

}

module.exports = Schema;