const { Pool } = require('pg');

const poolConfig = {};

/**
 * Try to handle PGSSLMODE :
 *
 * - disable|allow|prefer -> disabled with NodeJS
 * - require -> enabled
 * - verify-ca and verify-full -> not supported for now
 * 
 * @see https://docs.postgresql.fr/9.6/libpq.html#libpq-connect-sslmode
 */
const sslMode = process.env.PGSSLMODE || null;
if (sslMode != null && !['disable', 'allow', 'prefer'].includes(sslMode)) {
    poolConfig.ssl = {
        rejectUnauthorized: false
    }
}

const pool = new Pool(poolConfig);

module.exports = pool;
