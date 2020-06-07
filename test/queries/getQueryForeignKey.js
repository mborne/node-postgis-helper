const expect = require("chai").expect;

const queries = require('../../src/queries');

describe("Test queries.getKeyForeignKey...", function () {

    it("should return an expected query for queries.getKeyForeignKey('sample','user')", function () {
        let query = queries.getQueryForeignKey('sample','user');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getKeyForeignKey.json');
        expect(query).to.deep.equals(expected);
    });


});

