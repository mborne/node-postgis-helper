const ForeignKey = require('../models/ForeignKey');
const ForeignKeyTarget = require('../models/ForeignKeyTarget');

/**
 * Parse columns definition
 * @param {string} def example ("id","version")
 */
function parseColumnsDef(def){
    return def.trim()
        .replace('(','')
        .replace(')','')
        .split(',')
        .map(column => {
            return column.replace(/"/g,'').trim()
        })
    ;
}


/**
 * Parse foreign key definition
 * @param {string} definition
 * @returns {ForeignKey}
 */
function parseForeignKey(definition){
    let parts = definition
        .replace('FOREIGN KEY ','') // ignore prefix
        .split(/\sREFERENCES\s/i)
    ;

    // source columns
    let sourceColumnsDef = parts[0];
    // target columns
    let targetTableDef = parts[1].substr( 0, parts[1].indexOf('(') ).trim();
    let targetTableParts = targetTableDef.split('.').map(item => {return item.replace(/"/g,'')});
    let targetColumnsDef = parts[1].substr( parts[1].indexOf('(') ).trim();

    return new ForeignKey({
        columns: parseColumnsDef(sourceColumnsDef),
        target: new ForeignKeyTarget({
            schema: targetTableParts[0],
            name: targetTableParts[1],
            columns: parseColumnsDef( targetColumnsDef )
        })
    });
}

module.exports = parseForeignKey;