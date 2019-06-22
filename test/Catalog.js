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
                'user'
            ]);
        });

    });


    describe("Catalog.getPrimaryKey(schemaName,tableName)...", async function () {

        it("should return two items for getPrimaryKey('sample','building_h')", async function () {
            let primaryKey = await catalog.getPrimaryKey('sample','building_h');
            expect(primaryKey).to.deep.equals([
                "id",
                "version"
            ]);
        });

    });


    describe("Catalog.getTables(schemaName)...", async function () {

        it("should return an expected result for catalog.getTables('sample')", async function () {
            let tables = await catalog.getTables('sample');
            //console.log(JSON.stringify(tables,null,2));
            const expected = require('./DATA/sample.json');
            expect(tables).to.deep.equals(expected);
        });

    });

});

