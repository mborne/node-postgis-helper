const expect = require("chai").expect;

const helper = require('../../src/helper');

describe("Test helper.getQueryPrimaryKey...", function () {

    it("should return an expected query for helper.getQueryPrimaryKey('sample','user')", function () {
        let query = helper.getQueryPrimaryKey('sample','user');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryPrimaryKey.json');
        expect(query).to.deep.equals(expected);
    });


});

