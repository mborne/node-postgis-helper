const expect = require("chai").expect;

const fs = require('fs');
const path = require('path');

const helpers = require('../../src/helpers')
const Table = require('../../src/models/Table');

describe("helpers.toMarkdown(table)...", async function () {

    it("should provide an expected result for 'user'", async function () {
        let user = await helpers.readJsonTable(path.resolve(__dirname,'../DATA/sample/user.json'));
        let result = helpers.toMarkdown(user);
        let expectedPath = __dirname+'/expected/user.md';
        //fs.writeFileSync(expectedPath,result);
        let expected = fs.readFileSync(
            expectedPath,
            'utf-8'
        );
        expect(result).to.equals(expected);
    });

})
