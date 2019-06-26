
/**
 * Model describing a column of an SQL table.
 */
class Column {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {string} config.type
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string} [config.required=false]
     */
    constructor(config) {
        config = config || {};
        /**
         * @property {string} column name
         */
        this.name = config.name ? config.name : null ;
        /**
         * @property {string} display name
         */
        this.title = config.title ? config.title : this.name ;
        /**
         * @property {string} content description
         */
        this.description = config.description ? config.description : null ;
        /**
         * @property {string} type native SQL type
         */
        this.type = config.type ? config.type : null ;
        /**
         * @property {boolean} value required
         */
        this.required = config.required ? true : false ;

        /* allows additional properties */
        Object.keys(config).forEach(function(propertyName){
            if ( typeof this[propertyName] === 'undefined' ){
                this[propertyName] = config[propertyName];
            }
        }.bind(this));
    }

}

module.exports = Column;
