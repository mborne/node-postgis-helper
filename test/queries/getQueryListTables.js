const expect = require("chai").expect;

const queries = require('../../src/queries');

describe("Test queries.getQueryListTables...", function () {

    it("should apply default filter for queries.getQueryListTables()", function () {
        let query = queries.getQueryListTables();
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListTables1.json');
        expect(query).to.deep.equals(expected);
    });

    it("should apply custom filter for queries.getQueryListTables('sample')", function () {
        let query = queries.getQueryListTables('sample');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListTables2.json');
        expect(query).to.deep.equals(expected);
    });

});

