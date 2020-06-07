const ReferenceTarget = require('../models/ReferenceTarget');

/**
 * Parse ReferenceTarget definition
 * @param {string} config
 * @returns {ReferenceTarget}
 */
function parseReference(config){
    let regexp = /^(\w+)\.(\w+)\((\w+)\)$/g;
    let found = regexp.exec(config);
    if ( found == null ){
        throw new Error(`invalid reference '${config}'`);
    }
    return new ReferenceTarget({
        schema: found[1],
        name: found[2],
        column: found[3]
    });
}

module.exports = parseReference;