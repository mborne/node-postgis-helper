#!/usr/bin/env node

const program = require('commander');
const metadata = require('../package.json');
const colors = require('colors');
const commands = require('../src/commands');

program
    .version(metadata.version)
    .name("postgis-helper")
;


program
    .command('schema-to-json <schemaName> <outputDir>')
    .description(`Dump schema from database to JSON`)
    .action(async function (schemaName, outputDir, options) {
        await commands.schemaToJson(schemaName,outputDir);
    })
;

/* fallback */
program
    .command('*', 'Command not found')
    .action(function (env) {
        program.outputHelp(colors.red);
        process.exit(1);
    })
;


program.parse(process.argv);


