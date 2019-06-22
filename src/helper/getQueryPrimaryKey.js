const {QueryConfig} = require('pg');

/**
 * Get query to retreive primary key column(s)
 * @param {string} schemaName
 * @param {string} tableName
 * @return {QueryConfig}
 */
function getQueryPrimaryKey(schemaName,tableName){
    const sql =
`
select
	tc.constraint_schema as schema,
	tc.constraint_name as table,
	kcu.column_name as column
from information_schema.table_constraints tc
	JOIN information_schema.key_column_usage AS kcu
	      ON tc.constraint_name = kcu.constraint_name
where tc.constraint_type = 'PRIMARY KEY'
  and tc.table_schema = $1
  and tc.table_name = $2
order by kcu.ordinal_position
`;
    return {
        text: sql.trim(),
        values: [schemaName,tableName]
    };
}

module.exports = getQueryPrimaryKey;

