const ReferenceTarget = require('../models/ReferenceTarget');


/**
 * Parse reference definition
 * @param {string} config
 */
function parseReference(config){
    config = config.replace(')','');
    let parts = config.split('(');

    let tableParts = parts[0].split('.');
    return new ReferenceTarget({
        schema: tableParts[0],
        name: tableParts[1],
        column: parts[1]
    });
}

module.exports = parseReference;