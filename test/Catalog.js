const expect = require("chai").expect;

const Database = require('../src/Database');
const Catalog = require('../src/Catalog');

/**
 * @var {Database}
 */
var database = null;
/**
 * @var {Catalog}
 */
var catalog = null;

describe("Test Catalog...", async function () {

    before(async function () {
        database = await Database.createDatabase();
        database.batch(__dirname + '/DATA/sample.sql');
        catalog = database.getCatalog();
    });

    after(async function () {
        await database.close();
    });

    it("should return public in getSchemaNames()", async function () {
        let schemaNames = await catalog.getSchemaNames();
        expect(schemaNames).to.contains('public');
    });

    it("should contains 'user' in getTableName('sample')", async function () {
        let sampleTableNames = await catalog.getTableNames('sample');
        expect(sampleTableNames).to.contains('user');
    });

    it("should describe properties of table user", async function () {
        let table = await catalog.getTable('sample', 'user');
        expect(table).to.deep.equals(
            {
                "schemaName": "sample",
                "tableName": "user",
                "columns": [
                    {
                        "name": "id",
                        "type": "integer",
                        "is_nullable": false,
                        "is_primary": true
                    },
                    {
                        "name": "username",
                        "type": "text",
                        "is_nullable": true,
                        "is_primary": false
                    },
                    {
                        "name": "birthdate",
                        "type": "date",
                        "is_nullable": true,
                        "is_primary": false
                    },
                    {
                        "name": "is_admin",
                        "type": "boolean",
                        "is_nullable": true,
                        "is_primary": false
                    },
                    {
                        "name": "location",
                        "type": "geometry(Point,4326)",
                        "is_nullable": true,
                        "is_primary": false
                    }
                ]
            }
        );
    });

});

