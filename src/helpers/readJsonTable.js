const Table  = require('../models/Table');
const Column = require('../models/Column');

const readJson   = require('./readJson');
const resolveRef = require('./resolveRef');

/**
 * Load model from JSON path
 *
 * @param {string} tablePath
 */
async function readJsonTable(tablePath){
    let config = await readJson(tablePath);

    /* decode columns */
    config.columns = config.columns.map(columnConfig => {
        return new Column(columnConfig);
    })

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