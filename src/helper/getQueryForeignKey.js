const {QueryConfig} = require('pg');

/**
 * Get query to retreive foreign keys
 * @param {string} schemaName
 * @param {string} tableName
 * @return {QueryConfig}
 */
function getQueryForeignKey(schemaName,tableName){
    const sql =
`
SELECT
    conname as name,
    pg_catalog.pg_get_constraintdef(r.oid, true) as definition
FROM pg_catalog.pg_constraint r
WHERE r.contype = 'f'
    AND r.conrelid = ($1 ||'.' || $2)::regclass
ORDER BY conname
`;
    return {
        text: sql.trim(),
        values: [schemaName,tableName]
    };
}

module.exports = getQueryForeignKey;

