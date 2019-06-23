const expect = require("chai").expect;

const helper = require('../../src/helper');

describe("Test helper.getKeyForeignKey...", function () {

    it("should return an expected query for helper.getKeyForeignKey('sample','user')", function () {
        let query = helper.getQueryForeignKey('sample','user');
        //console.log(JSON.stringify(query,null,2));
        let expected = require('./expected/getKeyForeignKey.json');
        expect(query).to.deep.equals(expected);
    });


});

