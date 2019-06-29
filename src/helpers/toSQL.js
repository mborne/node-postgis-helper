const Schema = require('../models/Schema');
const Table = require('../models/Table');

/**
 * Returns CREATE TABLE statements
 * @param {Table} table
 */
function getSqlCreateTable(table,schemaName){
    let sqlColumns = [];
    table.columns.forEach(function(column){
        let sqlColumn = `    ${column.name} ${column.type}`;
        if ( column.unique ){
            sqlColumn += ' UNIQUE';
        }
        if ( column.required ){
            sqlColumn += ' NOT NULL';
        }
        if ( column.reference !== null ){
            let ref = column.reference;
            sqlColumn += ` REFERENCES ${ref.schema}.${ref.name}(${ref.column})`;
        }
        sqlColumns.push(sqlColumn);
    });
    if ( table.primaryKey.length !== 0 ){
        sqlColumns.push('    PRIMARY KEY ('+table.primaryKey.join(',')+')');
    }

    let sqlParts = [];
    sqlParts.push(`CREATE TABLE ${schemaName}.${table.name} (`);
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
    let schemaName = schema.name;

    let parts = [];
    parts.push('CREATE SCHEMA IF NOT EXISTS '+schemaName+';');
    parts.push('');
    schema.tables.forEach(function(table){
        parts.push('-- '+table.title);
        parts.push(getSqlCreateTable(table,schemaName));
        parts.push('');
    });
    return parts.join("\r\n");
}

module.exports = toSQL;
