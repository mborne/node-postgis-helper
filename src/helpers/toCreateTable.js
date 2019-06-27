const Table = require('../models/Table');

/**
 * Get SQL statements to CREATE TABLE according to
 * model
 * @param {Table} table
 */
function toCreateTable(table){
    let sqlColumns = [];
    table.columns.forEach(function(column){
        let sqlColumn = `    ${column.name} ${column.type}`;
        sqlColumns.push(sqlColumn);
    });
    if ( table.primaryKey.length !== 0 ){
        sqlColumns.push('    PRIMARY KEY ('+table.primaryKey.join(',')+')');
    }

    let sqlParts = [];
    sqlParts.push(`CREATE TABLE ${table.schema}.${table.name} (`);
    sqlParts.push(sqlColumns.join(",\r\n"));
    sqlParts.push(');');
    return sqlParts.join('\r\n');
}

module.exports = toCreateTable;
