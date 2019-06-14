const expect = require("chai").expect;
const fs = require('fs');
const shell = require('shelljs');

const Database = require('../src/Database');
const backup = require('../src/backup');

describe("Test backup...", async function () {

    it("should generate backup files", async function () {
        /* restore a backup */
        var database = await Database.createDatabase();
        await database.batch(__dirname+'/DATA/sample.sql');
        await database.close();

        /* prepare output dir */
        shell.rm('-rf','/tmp/test-backup');
        fs.mkdirSync('/tmp/test-backup');

        await backup({
            targetDir: '/tmp/test-backup',
            schemaName: 'sample'
        });
        expect(fs.existsSync('/tmp/test-backup/sample.schema.sql')).to.be.true;
        expect(fs.existsSync('/tmp/test-backup/sample.data.sql')).to.be.true;
    });

});

