const toMdTable = require('markdown-table');

/**
 * Convert a given schema to markdown
 *
 * @param {Schema} schema
 * @return {string}
 */
function toMarkdown(schema){
    let parts = [];

    parts.push(`# ${schema.name}`);
    parts.push('');

    if ( schema.description != null ){
        parts.push(schema.description);
        parts.push('');
    }

    schema.tables.forEach(function(table){
        parts.push("## "+table.name);
        parts.push('');

        if ( table.description != null ){
            parts.push(table.description);
            parts.push('');
        }

        let columnRows = [];
        columnRows.push([
            "Name",
            "Type",
            "Required",
            "Description"
        ]);

        table.columns.forEach(function(column){
            columnRows.push([
                column.name,
                '`'+column.type+'`',
                column.required ? 'Y' : 'N',
                column.description
            ]);
        });

        parts.push(toMdTable(columnRows));
        parts.push('');

    });

    return parts.join("\n");
}

module.exports = toMarkdown;

