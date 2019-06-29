module.exports = {
    "type": "object",
    "title": "Column",
    "description": "JSON description for SQL column",
    "required": ["name", "type"],
    "properties": {
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
        "type": {
            "type": "string",
            "title": "Type",
            "description": "Native SQL type"
        },
        "required": {
            "type": "boolean",
            "title": "Required",
            "description": "Indicates if value is required (opposite of nullable)",
            "default": false
        }
    }
}
