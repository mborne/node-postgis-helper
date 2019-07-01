const expect = require("chai").expect;

const parseForeignKey = require('../../src/internal/parseForeignKey');

describe("internal.parseForeignKey(definition)...", function () {

    const expected1 = {
        columns: [
            "source_id"
        ],
        target: {
            schema: "sample",
            name: "user",
            columns: ["id"]
        }
    };

    it("should work for '(source_id) REFERENCES sample.user(id)'",function(){
        let input  = "(source_id) REFERENCES sample.user(id)";
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected1);
    });

    it("should work for '(source_id) references sample.user(id)'",function(){
        let input  = "(source_id) references sample.user(id)";
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected1);
    });

    it("should work for 'FOREIGN KEY (source_id) REFERENCES sample.user(id)'",function(){
        let input  = "FOREIGN KEY (source_id) REFERENCES sample.user(id)";
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected1);
    });

    it(`should work for 'FOREIGN KEY ("source_id") REFERENCES "sample"."user"("id")'`,function(){
        let input  = 'FOREIGN KEY ("source_id") REFERENCES "sample"."user"("id")';
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected1);
    });

    const expected2 = {
        columns: [
            "building_id",
            "building_version"
        ],
        target: {
            schema: "sample",
            name: "building_h",
            columns: ["id","version"]
        }
    };

    it("should work for 'FOREIGN KEY (building_id, building_version) REFERENCES sample.building_h(id, version)'", function(){
        let input = 'FOREIGN KEY (building_id, building_version) REFERENCES sample.building_h(id, version)';
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected2);
    });

    it("should work for '(building_id, building_version) references sample.building_h(id, version)'", function(){
        let input = '(building_id, building_version) references sample.building_h(id, version)';
        let result = parseForeignKey(input);
        //console.log(JSON.stringify(result,null,2));
        expect(result).to.deep.equals(expected2);
    });

    function ensureItThrowFor(value){
        let thrown = false;
        try {
            parseForeignKey(value);
        }catch(e){
            thrown = true;
        }
        expect(thrown).to.equal(
            true,
            `parseForeignKey('${value}') should throw`
        );
    }

    it("should work report error for illegal values", function(){
        ensureItThrowFor('my_schema.my_table');
        ensureItThrowFor('my_schema.my_table()');
        ensureItThrowFor('my_schema_my_table(id)');
    });

})



