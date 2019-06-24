const expect = require("chai").expect;

const queries = require('../../src/queries');

describe("Test queries.getQueryPrimaryKey...", function () {

    it("should return an expected query for queries.getQueryPrimaryKey('sample','user')", function () {
        let query = queries.getQueryPrimaryKey('sample','user');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryPrimaryKey.json');
        expect(query).to.deep.equals(expected);
    });


});

