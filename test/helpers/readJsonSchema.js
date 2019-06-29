const expect = require("chai").expect;

const fs = require('fs');
const path = require('path');

const helpers = require('../../src/helpers')

describe("helpers.readJsonSchema(url)...", async function () {

    it("should provide an expected result for 'sample.json'", async function () {
        let result = await helpers.readJsonSchema(
            path.resolve(__dirname,'../DATA/sample.json')
        );
        let expectedPath = __dirname+'/expected/sample.json';
        //fs.writeFileSync(expectedPath,JSON.stringify(result,null,2));
        let expected = require(expectedPath);
        expect(result).to.deep.equals(expected);
    });

})
