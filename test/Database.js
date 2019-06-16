const expect = require("chai").expect;

const Database = require('../src/Database');

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

    it("should load sample data with batch(DATA/sample.sql)", async function () {
        database.batch(__dirname + '/DATA/sample.sql');
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

