const Table  = require('../models/Table');

const readJson   = require('./readJson');

/**
 * Load Table from URL or Path
 *
 * @param {string} config
 */
async function readJsonTable(config){
    if ( typeof config === 'string' ){
        config = await readJson(config);
    }
    let table = Table.createTable(config);
    return table;
}

module.exports = readJsonTable;