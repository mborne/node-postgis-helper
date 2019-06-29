const path = require('path');

/**
 * Resolve $ref from a given origin
 *
 * TODO make it works for URL or PATH
 * see https://www.npmjs.com/package/json-schema-ref-parser
 *
 * @param {object} reference
 * @param {string} reference.$ref
 * @param {string} sourcePath absolute path or absolute URL
 */
function resolveRef(reference,sourcePath){
    if ( typeof reference.$ref !== 'string' ){
        throw new Error(`invalid $ref property : ${JSON.stringify(reference)}`);
    }
    return path.resolve(
        path.dirname(sourcePath),
        reference.$ref
    );
}

module.exports = resolveRef;
