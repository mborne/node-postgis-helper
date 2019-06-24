function parseColumnsDef(def){
    return def.trim()
        .replace('(','')
        .replace(')','')
        .split(',')
        .map(column => {return column.trim()})
    ;
}


/**
 * Parse foreign key definition
 * @param {object} row
 * @param {string} row.name
 * @param {string} row.definition
 */
function parseForeignKey(row){
    let parts = row.definition.replace('FOREIGN KEY ','').split(' REFERENCES ');

    // source columns
    let sourceColumnsDef = parts[0];
    // target columns
    let targetTableDef = parts[1].substr( 0, parts[1].indexOf('(') ).trim();
    let targetTableParts = targetTableDef.split('.').map(item => {return item.replace(/"/g,'')});
    let targetColumnsDef = parts[1].substr( parts[1].indexOf('(') ).trim();

    return {
        name: row.name,
        columns: parseColumnsDef(sourceColumnsDef),
        target: {
            schema: targetTableParts[0],
            name: targetTableParts[1],
            columns: parseColumnsDef( targetColumnsDef )
        }
    };
}

module.exports = parseForeignKey;