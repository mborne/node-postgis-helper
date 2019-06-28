
/**
 * Model describing a ForeignKey for a given table
 */
class ForeignKey {
    /**
     * @param {object} config
     * @param {string} [config.name=null]
     * @param {string[]} config.columns source columns
     */
    constructor(config){
        /**
         * @property {string} foreign key name
         */
        this.name = config.name ? config.name : null;
        /**
         * @property {string[]} source columns
         */
        this.columns = config.columns ;
        /**
         * @property {ForeignKeyTarget} target columns in another table
         */
        this.target = new ForeignKeyTarget(config.target);
    }

}