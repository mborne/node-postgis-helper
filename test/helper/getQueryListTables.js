const expect = require("chai").expect;

const helper = require('../../src/helper');

describe("Test helper.getQueryListTables...", function () {

    it("should apply default filter for helper.getQueryListTables()", function () {
        let query = helper.getQueryListTables();
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListTables1.json');
        expect(query).to.deep.equals(expected);
    });

    it("should apply custom filter for helper.getQueryListTables('sample')", function () {
        let query = helper.getQueryListTables('sample');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListTables2.json');
        expect(query).to.deep.equals(expected);
    });

});

