const Column = require('./Column');
const ForeignKey = require('./ForeignKey');

/**
 * Model describing an SQL table
 */
class Table {

    /**
     * @param {object} config
     * @param {string} config.schema
     * @param {string} config.name
     * @param {Column[]} config.columns
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string|string[]} config.primaryKey
     * @param {ForeignKey[]} config.foreignKeys
     */
    constructor(config){
        /**
         * @property {string} schema name
         */
        this.schema = config.schema ? config.schema : null ;
        /**
         * @property {string} table name
         */
        this.name  = config.name ? config.name : null ;
        /**
         * @property {string} display name
         */
        this.title = config.title ? config.title : this.name ;
        /**
         * @property {string} content description
         */
        this.description = config.description ? config.description : null ;

        /**
         * @property {string[]} columns composing primary key
         */
        this.primaryKey = config.primaryKey ? config.primaryKey : [];
        /* automatically translate string to string[] to avoid further logic */
        if ( typeof this.primaryKey === 'string' ){
            this.primaryKey = [this.primaryKey];
        }
        /**
         * @property {ForeignKey[]} foreign keys
         */
        this.foreignKeys = config.foreignKeys ? config.foreignKeys : [] ;

        /**
         * @property {Column[]} columns
         */
        this.columns = config.columns ? config.columns : [] ;

        /* allows additional properties */
        Object.keys(config).forEach(function(propertyName){
            if ( typeof this[propertyName] === 'undefined' ){
                this[propertyName] = config[propertyName];
            }
        }.bind(this));
    }

}

module.exports = Table;
