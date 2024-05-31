const { Pool } = require('pg');

const poolConfig = {
    ssl: {
        rejectUnauthorized: false,
    }
};


const pool = new Pool(poolConfig);

module.exports = pool;
