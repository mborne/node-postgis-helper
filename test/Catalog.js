const expect = require("chai").expect;

const Database = require('../src/Database');
const Catalog = require('../src/Catalog');
const fs = require('fs');

/**
 * @var {Database}
 */
var database = null;
/**
 * @var {Catalog}
 */
var catalog = null;

describe("Catalog...", async function () {

    before(async function () {
        database = await Database.createDatabase();
        database.batch(__dirname + '/DATA/sample.sql');
        catalog = database.getCatalog();
    });

    after(async function () {
        await database.close();
    });


    describe("Catalog.getSchemaNames()...", async function () {
        it("should return public in getSchemaNames()", async function () {
            let schemaNames = await catalog.getSchemaNames();
            expect(schemaNames).to.contains('public');
        });
    });



    describe("Catalog.getTableNames(schemaName)...", async function () {

        it("should return ['user','building_h'] for getTableNames('sample')", async function () {
            let tableNames = await catalog.getTableNames('sample');
            //console.log(JSON.stringify(tableNames,null,2));
            expect(tableNames).to.deep.equals([
                'building_h',
                'building_owner',
                'user'
            ]);
        });

    });


    describe("Catalog.getSchema(schemaName)...", async function () {

        it("should return an expected result for catalog.getSchema('sample')", async function () {
            let tables = await catalog.getSchema('sample');
            // fs.writeFileSync(
            //     __dirname+'/expected/sample.json',
            //     JSON.stringify(tables,null,2)
            // );
            const expected = require('./expected/sample.json');
            expect(tables).to.deep.equals(expected);
        });

    });



    describe("Catalog.getForeignKeys(schemaName,tableName)...", async function () {

        it("should return two items for getForeignKeys('sample','building_h')", async function () {
            let foreignKeys = await catalog.getForeignKeys('sample', 'building_h');
            //console.log(JSON.stringify(foreignKeys, null, 2));
            const expected = [
                {
                    "columns": ["owner_id"],
                    "target": {
                        "schema": "sample",
                        "name": "user",
                        "columns": ["id"]
                    }
                }
            ];
            expect(foreignKeys).to.deep.equals(expected);
        });

    });

});

