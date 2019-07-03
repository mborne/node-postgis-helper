const Model = require('./Model');
const Table  = require('./Table');

/**
 * Model describing a group of tables
 */
class Schema extends Model {

    /**
     * @param {object} config
     * @param {object[]} config.tables
     */
    constructor(config){
        super(config);

        /**
         * @property {Table[]} tables
         */
        this.tables = config.tables ? this.bindTables(config.tables) : [];
    }

    /**
     * Create Schema from config object
     * @param {object} config
     * @returns {Schema}
     */
    static createSchema(config){
        return new Schema(config);
    }

    /**
     * Force type for tables
     *
     * @private
     *
     * @param {object[]} tables
     * @returns {Table[]}
     */
    bindTables(tables){
        return tables.map(table => {
            if ( table instanceof Table ){
                return table;
            }else{
                return Table.createTable(table);
            }
        });
    }


}

module.exports = Schema;