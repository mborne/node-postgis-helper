const toMdTable = require('markdown-table');

/**
 * Conversion des tables en markdown
 *
 * @param {Table} table
 * @return {string}
 */
function toMarkdown(table){
    let parts = [];

    parts.push("## "+table.name);
    parts.push('');

    if ( table.description != null ){
        parts.push(table.description);
        parts.push('');
    }

    let mdRows = [];
    mdRows.push([
        "Name",
        "Title",
        "Type",
        "Required",
        "Description"
    ]);

    table.columns.forEach(function(column){
        mdRows.push([
            column.name,
            column.title,
            column.type,
            column.required ? 'Y' : 'N',
            column.description
        ]);
    });

    parts.push(toMdTable(mdRows));
    parts.push('');

    return parts.join("\r\n");
}

module.exports = toMarkdown;

