const path = require('path');
const fs = require('fs');

const docsDir = path.resolve(__dirname,'../docs');

if ( ! fs.existsSync(docsDir) ){
    fs.mkdirSync(docsDir);
}

const schemaTable = require('../src/schema/Table');
fs.writeFileSync(docsDir+'/Table.json',JSON.stringify(schemaTable,null,2));
