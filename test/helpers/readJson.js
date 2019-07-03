const expect = require("chai").expect;

const path = require('path');
const helpers = require('../../src/helpers')

describe("helpers.readJson(url)...", async function () {

    it("should work for file", async function () {
        let schema = path.resolve(__dirname,'../DATA/sample.json');
        let result = await helpers.readJson(schema);

        expect(result).to.haveOwnProperty('name');
        expect(result.name).to.equals('sample');

        expect(result).to.haveOwnProperty('tables');
        expect(result.tables).to.be.an('array');

        expect(result.tables.length).to.equal(4);

        let firstTable = result.tables[0];
        expect(firstTable).to.haveOwnProperty('name');
        expect(firstTable.name).to.equal('user');
    });

})
