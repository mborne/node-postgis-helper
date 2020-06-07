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
                "columns": [],
                "primaryKey": [],
                "foreignKeys": []
            });
        });

        it("should parse foreign keys", function () {
            let table = new Table({
                name: 'my_table',
                foreignKeys: [
                    '(building_id,building_version) references sample.building(id,version)'
                ]
            });
            //console.log(JSON.stringify(table, null, 2));
            expect(table).to.deep.equals({
                "name": "my_table",
                "columns": [],
                "primaryKey": [],
                "foreignKeys": [
                    {
                        "columns": ["building_id","building_version"],
                        "target": {
                            "schema": "sample",
                            "name": "building",
                            "columns": ["id","version"]
                        }
                    }
                ]
            });
        });


    });

})
