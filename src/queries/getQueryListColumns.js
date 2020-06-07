const {QueryConfig} = require('pg');

/**
 * Get SQL query to list columns for a given table
 * @param {string} schemaName
 * @param {string} tableName
 * @returns {QueryConfig}
 */
function getQueryListColumns(schemaName,tableName){
    const sql =
`
SELECT
    a.attname as name,
    format_type(a.atttypid, a.atttypmod) AS type,
    (a.attnotnull = false) as is_nullable
from pg_attribute a
    where a.attrelid = ($1 ||'.' || $2)::regclass
    and a.attnum > 0
    and not a.attisdropped
`;
    return {
        text: sql.trim(),
        values: [schemaName,tableName]
    };
}

module.exports = getQueryListColumns;
