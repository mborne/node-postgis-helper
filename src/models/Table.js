const Model = require('./Model');

const Column = require('./Column');
const ForeignKey = require('./ForeignKey');

/**
 * Model describing an SQL table
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
            if ( typeof this[propertyName] === 'undefined' ){
                this[propertyName] = config[propertyName];
            }
        }.bind(this));
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
            }else{
                return new ForeignKey(foreignKey);
            }
        });
    }


}

module.exports = Table;
