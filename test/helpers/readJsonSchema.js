const expect = require("chai").expect;

const fs = require('fs');
const path = require('path');

const helpers = require('../../src/helpers')

describe("helpers.readJsonSchema(url)...", async function () {

    it("should provide an expected result for 'sample.json'", async function () {
        let schema = await helpers.readJsonSchema(
            path.resolve(__dirname,'../DATA/sample.json')
        );
        console.log(JSON.stringify(schema,null,2));
    });

})
