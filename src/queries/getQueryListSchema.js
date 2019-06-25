const {QueryConfig} = require('pg');

/**
 * Get query to list schema names
 * @returns {QueryConfig}
 */
function getQueryListSchema(){
    const sql = `select schema_name from information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'`;
    return {
        text: sql
    }
}

module.exports = getQueryListSchema;
