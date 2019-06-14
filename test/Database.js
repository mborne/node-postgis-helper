const expect = require("chai").expect;

const Database = require('../src/Database');

describe("Test Database...", async function () {
    it("should return public in getSchemaNames()", async function () {
        var database = await Database.createDatabase();
        let schemaNames = await database.getSchemaNames();
        await database.close();
        expect(schemaNames).to.contains('public');
    });

    it("should load sample data with batch(DATA/sample.sql)", async function () {
        var database = await Database.createDatabase();
        database.batch(__dirname + '/DATA/sample.sql');

        let sampleTableNames = await database.getTableNames('sample');
        let users = await database.query('SELECT id,username FROM sample.user ORDER BY id');
        await database.close();

        expect(sampleTableNames).to.contains('user');
        expect(users).to.deep.equals([
            {
                "id": 1,
                "username": "titi"
            },
            {
                "id": 2,
                "username": "toto"
            }
        ]);
    });

});

