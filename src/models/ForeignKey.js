const ForeignKeyTarget = require('./ForeignKeyTarget');

/**
 * Model describing a ForeignKey for a given table
 */
class ForeignKey {
    /**
     * @param {object} config
     * @param {string[]} [config.columns] source columns
     * @param {ForeignKeyTarget} [config.target] target columns
     */
    constructor(config){
        /**
         * @property {string[]} source columns
         */
        this.columns = config.columns ;
        /**
         * @property {ForeignKeyTarget} target columns in another table
         */
        this.target = config.target ? config.target : null;
    }

}

module.exports = ForeignKey;
