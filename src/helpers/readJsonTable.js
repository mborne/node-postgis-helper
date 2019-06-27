const Table = require('../models/Table');

const fs = require('fs');
const path = require('path');

/**
 * Load model from JSON path
 * @param {string} url
 */
async function readJsonTable(tablePath){
    let config = JSON.parse( fs.readFileSync(tablePath,'utf-8') );

    let table = new Table(config);

    /* resolve parent (handle inheritance) */
    if ( config.parent ){
        let parentPath = path.resolve( path.dirname(tablePath), config.parent );
        let parentTable = await readJsonTable(parentPath);
        // inherits parent primaryKey
        if ( parentTable.primaryKey ){
            table.primaryKey = parentTable.primaryKey;
        }
        // inherits parent columns
        table.columns = parentTable.columns.concat(table.columns);
    }
    return table;
}

module.exports = readJsonTable;