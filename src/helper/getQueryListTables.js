const {QueryConfig} = require('pg');

/**
 * Get SQL query to retreive table names
 * @param {string} [schema] filter according to a given schema
 * @returns {QueryConfig}
 */
function getQueryListTables(schemaName){
    let sqlParams = [];
    let sqlParts = [
        `select`,
        `table_schema as schema, table_name as table, ( table_type = 'VIEW' ) as is_view`,
        `from information_schema.tables`
    ];
    if ( schemaName ){
        // filter according to schema
        sqlParts.push("WHERE table_schema LIKE $1");
        sqlParams.push(schemaName);
    }else{
        // filter by default according to public tables
        sqlParts.push(
            "WHERE table_schema not like 'pg_%' and table_schema != 'information_schema'"
        );
    }
    sqlParts.push("ORDER BY table_schema,table_name");

    return {
        text: sqlParts.join(" "),
        values: sqlParams
    }
}

module.exports = getQueryListTables;
