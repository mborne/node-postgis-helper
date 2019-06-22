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

    it("should return ['user','building_h'] for getTableNames('sample')", async function () {
        let tableNames = await catalog.getTableNames('sample');
        //console.log(JSON.stringify(tableNames,null,2));
        expect(tableNames).to.deep.equals([
            'building_h',
            'user'
        ]);
    });

    it("should contains 'user' in getTableName('sample')", async function () {
        let sampleTableNames = await catalog.getTableNames('sample');
        expect(sampleTableNames).to.contains('user');
    });


    it("should return an expected result for catalog.getTables('sample')", async function () {
        let tables = await catalog.getTables('sample');
        //console.log(JSON.stringify(tables,null,2));
        const expected = require('./DATA/sample.tables.json');
        expect(tables).to.deep.equals(expected);
    });

});

