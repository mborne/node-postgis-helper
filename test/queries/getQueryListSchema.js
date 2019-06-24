const expect = require("chai").expect;

const queries = require('../../src/queries');

describe("Test queries.getQueryListSchema...", function () {

    it("should returns the expected query for queries.getQueryListSchema()", function () {
        let query = queries.getQueryListSchema();
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListSchema.json');
        expect(query).to.deep.equals(expected);
    });


});

