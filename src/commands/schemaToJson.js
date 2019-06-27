const Database = require('../Database');

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

/**
 * Converts a given schema to JSON files
 * @param {string} schemaName
 * @param {string} outputDir
 */
async function schemaToJson(schemaName,outputDir){
    outputDir = path.resolve(outputDir);

    let database = await Database.createDatabase();
    if ( ! database.hasSchema(schemaName) ){
        throw new Error(`schema '${schemaName} not found!'`);
    }

    /* ensure output directory exists */
    if ( ! fs.existsSync(outputDir) ){
        shell.mkdir('-p',outputDir);
    }

    let tables = await database.getTables(schemaName);
    tables.forEach(function(table){
        const tablePath = path.resolve(outputDir,`./${table.name}.json`);
        fs.writeFileSync(tablePath,JSON.stringify(table,null,2));
    });
    await database.close();
}

module.exports = schemaToJson ;

