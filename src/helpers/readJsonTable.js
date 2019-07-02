const Table  = require('../models/Table');

const readJson   = require('./readJson');

/**
 * Load model from JSON path
 *
 * @param {string} tablePath
 */
async function readJsonTable(tablePath){
    let config = await readJson(tablePath);

    let table = new Table(config);

    /* resolve parent (handle inheritance) */
    if ( config.parent ){
        let parentPath = resolveRef(config.parent,tablePath);
        let parentTable = await readJsonTable(parentPath);
        // inherits parent primaryKey
        if ( parentTable.primaryKey ){
            table.primaryKey = parentTable.primaryKey;
        }
        // inherits parent columns
        table.columns = parentTable.columns.concat(table.columns);

        // remove parent reference
        delete table.parent;
    }
    return table;
}

module.exports = readJsonTable;