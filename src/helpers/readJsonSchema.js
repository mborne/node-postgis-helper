const Schema = require('../models/Schema');

const readJson = require('./readJson');

/**
 * Read Schema from URL or Path
 * @param {string} config
 * @returns {Schema}
 */
async function readJsonSchema(config){
    if ( typeof config === 'string' ){
        config = await readJson(config);
    }
    return Schema.createSchema(config);
}

module.exports = readJsonSchema;
