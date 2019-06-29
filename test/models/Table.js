const expect = require("chai").expect;

const Table = require('../../src/models/Table');


describe("Table...", function () {

    describe("Table constructor...", function () {

        it("should build default values to avoid further undefined testing", function () {
            let table = new Table({
                name: 'my_table'
            });
            //console.log(JSON.stringify(table, null, 2));
            expect(table).to.deep.equals({
                "name": "my_table",
                "title": "my_table",
                "description": null,
                "columns": [],
                "primaryKey": [],
                "foreignKeys": []
            });
        });

    });

})
