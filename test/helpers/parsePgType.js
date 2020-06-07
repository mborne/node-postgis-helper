const expect = require("chai").expect;

const helpers = require('../../src/helpers')

describe("helpers.parsePgType(fullName)...", function () {

    it("should provide an expected result for 'text'", function () {
        let result = helpers.parsePgType('text');
        expect(result).to.deep.equals({
            name: "text",
            params: []
        });
    });


    it("should provide an expected result for 'character varying(50)'", function () {
        let result = helpers.parsePgType('character varying(50)');
        expect(result).to.deep.equals({
            name: "character varying",
            params: [
                "50"
            ]
        });
    });


    it("should provide an expected result for 'geometry(Point,4326)'", function () {
        let result = helpers.parsePgType('geometry(Point,4326)');
        expect(result).to.deep.equals({
            name: "geometry",
            params: [
                "Point",
                "4326"
            ]
        });
    });

})
