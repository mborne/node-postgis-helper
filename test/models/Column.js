const expect = require("chai").expect;

const Column = require('../../src/models/Column');


describe("Column...", function () {

    describe("Column constructor...", function () {

        it("should build default values to avoid further undefined testing", function () {
            let column = new Column({
                name: 'my_column',
                type: 'text'
            });
            //console.log(JSON.stringify(column, null, 2));
            expect(column).to.deep.equals({
                "name": "my_column",
                "title": "my_column",
                "description": null,
                "type": "text",
                "required": false,
                "tags": {}
            });
        });

    });

})
