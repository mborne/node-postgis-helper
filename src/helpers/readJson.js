const fs = require('fs');

/**
 * Read JSON content from path or URL
 * @param {string} path
 * @returns {any}
 */
async function readJson(path){
    let content = fs.readFileSync(path,'utf-8');
    return JSON.parse(content);
}

module.exports = readJson;

