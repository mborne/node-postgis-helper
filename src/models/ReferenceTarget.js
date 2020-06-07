/**
 * Describe the target of a reference from
 * a given column
 */
class ReferenceTarget {
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
         * @property {string} target column name
         */
        this.column = config.column ;
    }
}

module.exports = ReferenceTarget;