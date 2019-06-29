module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Table",
    "description": "JSON description for SQL Table",
    "type": "object",
    "required": ["name", "columns"],
    "properties": {
        "parent": {
            "type": "string",
            "title": "Parent table",
            "description": "Reference to parent table"
        },
        "schema": {
            "type": "string",
            "title": "Schema",
            "description": "The name of the schema containing the table"
        },
        "name": {
            "type": "string",
            "title": "Name",
            "description": "The name of the table"
        },
        "title": {
            "type": "string",
            "title": "Title",
            "description": "The display name of the table"
        },
        "description": {
            "type": "string",
            "title": "Description",
            "description": "The description of the table"
        },
        "primaryKey": {
            "type": "array",
            "title": "Primary keys",
            "description": "The column(s) identifying rows",
            "items": {
                "type": "string"
            }
        },
        "foreignKeys": {
            "type": "array",
            "title": "Foreign keys",
            "items": { "$ref": "#/definitions/ForeignKey" }
        },
        "columns": {
            "type": "array",
            "title": "Columns",
            "description": "Columns definition",
            "items": { "$ref": "#/definitions/Column" }
        }
    },
    "definitions": {
        "Column": require('./Column'),
        "ForeignKey": require('./ForeignKey'),
        "ParentRef": require('./ParentRef')
    }
};
