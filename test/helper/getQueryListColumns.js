const expect = require("chai").expect;

const helper = require('../../src/helper');

describe("Test helper.getQueryListColumns...", function () {

    it("should return an expected query for helper.getQueryListTables('the_schema','the_table')", function () {
        let query = helper.getQueryListColumns('the_schema','the_table');
        console.log(JSON.stringify(query,null,2));
        let expected = require('./getQueryListColumns-expected.json');
        expect(query).to.deep.equals(expected);
    });


});

