const Model = require('./Model');

const Column = require('./Column');
const ForeignKey = require('./ForeignKey');
const parseForeignKey = require('../internal/parseForeignKey');

/**
 * Model describing a Table
 */
class Table extends Model {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {Column[]} config.columns
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string|string[]} config.primaryKey
     * @param {ForeignKey[]} config.foreignKeys
     */
    constructor(config){
        super(config);

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
        this.foreignKeys = config.foreignKeys ?
            this.bindForeignKeys(config.foreignKeys)
            :
            []
        ;

        /**
         * @property {Column[]} columns
         */
        this.columns = config.columns ? this.bindColumns( config.columns ): [] ;

        /* allows additional properties */
        Object.keys(config).forEach(function(propertyName){
            if ( propertyName === 'parent' ){
                return;
            }
            if ( typeof this[propertyName] === 'undefined' ){
                this[propertyName] = config[propertyName];
            }
        }.bind(this));
    }

    /**
     * Create table from config object
     * @param {object} config
     * @returns {Table}
     */
    static createTable(config){
        let table = new Table(config);
        /* resolve inheritence recursively */
        if ( config.parent ){
            let parentTable = Table.createTable(config.parent);
            // inherits parent primaryKey
            if ( parentTable.primaryKey ){
                table.primaryKey = parentTable.primaryKey;
            }
            // inherits parent columns
            table.columns = parentTable.columns.concat(table.columns);
        }
        return table;
    }

    /**
     * Force type for columns
     *
     * @private
     *
     * @param {object[]} columns
     * @returns {Column[]}
     */
    bindColumns(columns){
        return columns.map(column => {
            if ( column instanceof Column ){
                return column;
            }else{
                return new Column(column);
            }
        });
    }

    /**
     * @param {object[]} foreignKeys
     */
    bindForeignKeys(foreignKeys){
        return foreignKeys.map(foreignKey => {
            if ( foreignKey instanceof ForeignKey ){
                return foreignKey;
            }else if ( typeof foreignKey === 'string' ){
                return parseForeignKey(foreignKey);
            }else{
                return new ForeignKey(foreignKey);
            }
        });
    }


}

module.exports = Table;
