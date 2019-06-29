const Schema = require('../models/Schema');
const Table = require('../models/Table');

/**
 * Returns CREATE TABLE statements
 * @param {Table} table
 */
function getSqlCreateTable(table){
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

/**
 * Get SQL statements to CREATE TABLE according to
 * model
 * @param {Schema} schema
 */
function toSQL(schema){
    let parts = [];
    parts.push('CREATE SCHEMA IF NOT EXISTS '+schema.name+';');
    parts.push('');
    schema.tables.forEach(function(table){
        parts.push('-- '+table.title);
        parts.push(getSqlCreateTable(table));
        parts.push('');
    });
    return parts.join("\n");
}

module.exports = toSQL;
