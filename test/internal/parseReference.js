const expect = require("chai").expect;

const parseReference = require('../../src/internal/parseReference');

describe("internal.parseReference(definition)...", function () {

    it("should work for 'my_schema.my_table(my_column)'", function(){
        let result = parseReference('my_schema.my_table(my_column)');
        expect(result).to.deep.equals({
            schema: "my_schema",
            name: "my_table",
            column: "my_column"
        });
    });

    it("should work for 'MySchema.MyTable(MyColumn)'", function(){
        let result = parseReference('MySchema.MyTable(MyColumn)');
        expect(result).to.deep.equals({
            schema: "MySchema",
            name: "MyTable",
            column: "MyColumn"
        });
    });

    it("should work for 'my_schema.my_table(my_column2)'", function(){
        let result = parseReference('my_schema.my_table(my_column2)');
        expect(result).to.deep.equals({
            schema: "my_schema",
            name: "my_table",
            column: "my_column2"
        });
    });

    function ensureItThrowFor(value){
        let thrown = false;
        try {
            parseReference(value);
        }catch(e){
            thrown = true;
        }
        expect(thrown).to.equal(
            true,
            `parseReference('${value}') should throw`
        );
    }

    it("should work report error for illegal values", function(){
        ensureItThrowFor('my_schema.my_table');
        ensureItThrowFor('my_schema.my_table()');
        ensureItThrowFor('my_schema_my_table(id)');
    });

})

