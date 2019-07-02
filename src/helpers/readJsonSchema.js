const Schema = require('../models/Schema');

const readJson = require('./readJson');
const readJsonTable = require('./readJsonTable');

/**
 * Read JSON Schema
 * @param {string} schemaPath
 */
async function readJsonSchema(schemaPath){
    let config = await readJson(schemaPath);
    for ( var i in config.tables ){
        let tableRef = config.tables[i];
        let tableConfigPath = await resolveRef(tableRef,schemaPath);
        config.tables[i] = await readJsonTable(tableConfigPath);
    }
    return new Schema(config);
}

module.exports = readJsonSchema;
