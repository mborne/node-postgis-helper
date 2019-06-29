const expect = require("chai").expect;

const fs = require('fs');
const path = require('path');

const helpers = require('../../src/helpers')


describe("helpers.toSQL(schema)...", async function () {

    it("should provide an expected result for 'adminexpress'", async function () {
        let schemaPath = path.resolve(__dirname,'../DATA/adminexpress.json');
        let schema = await helpers.readJsonSchema(schemaPath);
        let result = helpers.toSQL(schema);
        let expectedPath = __dirname+'/expected/adminexpress.schema.sql';
        //fs.writeFileSync(expectedPath,result);
        let expected = fs.readFileSync(
            expectedPath,
            'utf-8'
        );
        expect(result).to.equals(expected);
    });

})
