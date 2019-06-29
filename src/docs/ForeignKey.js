module.exports = {
    "type": "object",
    "title": "Foreign key",
    "description": "Describe a reference to another table",
    "properties": {
        "name": {
            "type": "string",
            "title": "Name",
            "description": "The name of the constraints"
        },
        "columns": {
            "type": "array",
            "title": "Column",
            "description": "Source table columns",
            "items": {
                "type": "string"
            }
        },
        "target": {
            "type": "object",
            "title": "Target",
            "description": "The target of the foreign key",
            "properties": {
                "schema": {
                    "type": "string",
                    "title": "Target schema"
                },
                "name": {
                    "type": "string",
                    "title": "Target table"
                },
                "columns": {
                    "type": "array",
                    "title": "Target columns",
                    "items": {
                        "type": "string"
                    }
                }
            }
        }
    }
};

