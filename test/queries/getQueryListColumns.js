const expect = require("chai").expect;

const queries = require('../../src/queries');

describe("Test queries.getQueryListColumns...", function () {

    it("should return an expected query for queries.getQueryListTables('the_schema','the_table')", function () {
        let query = queries.getQueryListColumns('the_schema','the_table');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListColumns.json');
        expect(query).to.deep.equals(expected);
    });


});

