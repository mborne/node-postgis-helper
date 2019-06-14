# node-postgis-helper

## Description

Helpers for PostgreSQL/PostGIS (schema discovery, psql, pg_dump,...)

## Parameters

Connection to the database relies on PostgreSQL environment variables (PGHOST, PGDATABASE, etc.)

## Features

### Create and release connections

```js
let database = await Database.createDatabase();
let activites = await database.query('SELECT * FROM pg_stat_activities');
await database.close();
```

### Schema discovery

```js
let schemaNames = await database.getSchemaNames();
await database.hasSchema('public');
```

### Table discovery

```js
let tableNames = await database.getTableNames('public');
```


### Backup a given schema

```js
const {backup} = require('@mborne/postgis-helper');

/*
 * Rely on pg_dump to backup 'cadastre' schema as :
 * - /mnt/postgis-backup/cadastre.schema.sql
 * - /mnt/postgis-backup/cadastre.data.sql
 */
await backup({
    schemaName: 'cadastre',
    targetDir: '/mnt/postgis-backup'
});
```

## Testing

```bash
createdb test
PGDATABASE=test npm run test
```


