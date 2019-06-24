const expect = require("chai").expect;

const Database = require('../src/Database');

/**
 * @var {Database}
 */
var database = null;

describe("Test Database...", async function () {

    before(async function() {
        database = await Database.createDatabase();
    });

    after(async function() {
        await database.close();
    });

    it("should return public in getSchemaNames()", async function () {
        let schemaNames = await database.getSchemaNames();
        expect(schemaNames).to.contains('public');
    });

    it("should return true for hasSchema('public')", async function () {
        let result = await database.hasSchema('public');
        expect(result).to.be.true;
    });

    it("should load sample data with batch(DATA/sample.sql)", async function () {
        /* load sample data */
        await database.batch(__dirname + '/DATA/sample.sql');
        /* check table exists */
        let tableNames = await database.getTableNames('sample');
        expect(tableNames).to.contains('user');
        /* retrieve users */
        let users = await database.query('SELECT id,username,birthdate::text FROM sample.user ORDER BY id');
        expect(users).to.deep.equals([
            {
                "id": 1,
                "username": "titi",
                "birthdate": "1984-01-01"
            },
            {
                "id": 2,
                "username": "toto",
                "birthdate": "1986-01-01"
            }
        ]);
    });

});

