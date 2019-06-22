

/**
 * Represents the columns of a table
 */
class Column {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {string} config.type
     * @param {string} config.is_nullable
     */
    constructor(config) {
        /**
         * @property {text} column name
         */
        this.name = config.name;
        /**
         * @property {text} SQL type
         */
        this.type = config.type;
        /**
         * @property {boolean} null value allowed
         */
        this.is_nullable = config.is_nullable;
    }

}

module.exports = Column;
