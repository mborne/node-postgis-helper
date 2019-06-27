const expect = require("chai").expect;

const fs = require('fs');
const path = require('path');

const helpers = require('../../src/helpers')
const Table = require('../../src/models/Table');

describe("helpers.readJsonTable(url)...", async function () {

    it("should provide an expected result for 'user.json'", async function () {
        let result = await helpers.readJsonTable(
            path.resolve(__dirname,'../DATA/user.json')
        );
        let expectedPath = __dirname+'/expected/user.json';
        //fs.writeFileSync(expectedPath,JSON.stringify(result,null,2));
        let expected = require(expectedPath);
        expect(result).to.deep.equals(expected);
    });

    it("should provide an expected result for 'user_ext.json'", async function () {
        let result = await helpers.readJsonTable(
            path.resolve(__dirname,'../DATA/user_ext.json')
        );
        let expectedPath = __dirname+'/expected/user_ext.json';
        //fs.writeFileSync(expectedPath,JSON.stringify(result,null,2));
        let expected = require(expectedPath);
        expect(result).to.deep.equals(expected);
    });

})
