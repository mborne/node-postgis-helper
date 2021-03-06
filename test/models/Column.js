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
                "type": "text",
                "reference": null,
                "required": false,
                "unique": false
            });
        });


        it("should parse references", function () {
            let column = new Column({
                name: 'my_column',
                type: 'text',
                reference: 'target_schema.target_table(target_column)'
            });
            //console.log(JSON.stringify(column, null, 2));
            expect(column).to.deep.equals({
                "name": "my_column",
                "type": "text",
                "reference": {
                    "schema": "target_schema",
                    "name": "target_table",
                    "column": "target_column"
                },
                "required": false,
                "unique": false
            });
        });

    });

})
