

/**
 * Parse PostgreSQL type
 * @param {string} fullName example geometry(Point,4326)
 */
function parsePgType(fullName){
    let parts = fullName.split('(');
    if ( parts.length === 1 ){
        return {
            name: fullName,
            params: []
        }
    }else{
        return {
            name: parts[0],
            params: parts[1].replace(')','').split(',')
        }
    }
}

module.exports = parsePgType;
