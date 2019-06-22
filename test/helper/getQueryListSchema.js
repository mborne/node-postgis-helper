const expect = require("chai").expect;

const helper = require('../../src/helper');

describe("Test helper.getQueryListSchema...", function () {

    it("should returns the expected query for helper.getQueryListSchema()", function () {
        let query = helper.getQueryListSchema();
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getQueryListSchema.json');
        expect(query).to.deep.equals(expected);
    });


});

