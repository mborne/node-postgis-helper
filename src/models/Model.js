
/**
 * Common fields for models
 */
class Model {

    constructor(config){
        /**
         * @property {string} name
         */
        this.name   = config.name ? config.name : null;
        if ( config.title ){
            /**
             * @property {string} display name
             */
            this.title = config.title ;
        }
        if ( config.description ){
            /**
             * @property {string} description
             */
            this.description = config.description ;
        }
    }

}

module.exports = Model;
