/**
 * Describe the target of a foreign key
 */
class ForeignKeyTarget {
    constructor(config){
        /**
         * @property {string} target schema name
         */
        this.schema = config.schema ;
        /**
         * @property {string} target table name
         */
        this.name = config.name ;
        /**
         * @property {string[]} target column names
         */
        this.columns = config.columns ;
    }
}

module.exports = ForeignKeyTarget;