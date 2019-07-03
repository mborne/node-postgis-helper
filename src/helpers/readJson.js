const $RefParser = require("json-schema-ref-parser");

/**
 * Read JSON content from path or URL
 * resolving "$ref" elements
 * @param {string} path
 * @returns {any}
 */
async function readJson(path){
    let result = await $RefParser.dereference(path);
    return result;
}

module.exports = readJson;

