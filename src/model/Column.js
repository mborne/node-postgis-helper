

/**
 * Represents the columns of a table
 */
class Column {

    constructor() {
        /**
         * @property {text} column name
         */
        this.name = null;
        /**
         * @property {text} PostgreSQL type
         */
        this.type = "text";
        /**
         * @property {boolean} null value allowed
         */
        this.is_nullable = true;
        /**
         * @property {text} column name
         */
        this.is_primary = false;
    }

    /**
     * Create column from row data
     * @param {object} row
     * @return {Column}
     */
    static createColumn(row){
        let column = new Column();
        return Object.assign(column,row);
    }

}

module.exports = Column;
