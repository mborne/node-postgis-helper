const Model = require('./Model');

const parseReference = require('../internal/parseReference');
const ReferenceTarget = require('./ReferenceTarget');

/**
 * Model describing a column of an SQL table.
 */
class Column extends Model {

    /**
     * @param {object} config
     * @param {string} config.name
     * @param {string} config.type
     * @param {string} [config.title]
     * @param {string} [config.description]
     * @param {string} [config.required=false]
     */
    constructor(config) {
        super(config);
        /**
         * @property {string} type native SQL type
         */
        this.type = config.type ? config.type : null ;
        /**
         * @property {boolean} value required?
         */
        this.required = config.required ? true : false ;
        /**
         * @property {boolean} value is unique for table?
         */
        this.unique = config.unique ? true : false ;

        /**
         * @property {ReferenceTarget} reference target
         */
        this.reference = config.reference ?
            this.bindReferenceTarget( config.reference )
            :
            null
        ;

        /* allows additional properties */
        Object.keys(config).forEach(function(propertyName){
            if ( typeof this[propertyName] === 'undefined' ){
                this[propertyName] = config[propertyName];
            }
        }.bind(this));
    }

    /**
     * Ensure type for ReferenceTarget
     *
     * @private
     *
     * @param {object} config
     * @returns {ReferenceTarget}
     */
    bindReferenceTarget(config){
        if ( config instanceof ReferenceTarget ){
            return config;
        }else if ( typeof config === 'string' ){
            return parseReference(config);
        }else{
            return new ReferenceTarget(config);
        }
    }

}

module.exports = Column;
