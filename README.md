# node-postgis-helper

## Description

Helpers for PostgreSQL/PostGIS (schema discovery, psql, pg_dump,...)

## Parameters

Connection to the database relies on PostgreSQL environment variables (PGHOST, PGDATABASE, etc.)

## Concepts

| Concept       | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| Database      | Database connexion wrapper (`Client` from `pg`)                              |
| Catalog       | Database schema explorer (schemas, tables, columns, constraints)             |
| SourceManager | Manage a per-schema `source` table to track source when loading foreign data |
| Table         | JS model describing an SQL table                                             |
| Column        | JS model describing an SQL column                                            |

## Features

`Client` wrapper for `pg` module providing helpers.

### Create and release connections

```js
let database = await Database.createDatabase();
let activites = await database.query('SELECT * FROM pg_stat_activity');
await database.close();
```

### List schemas

```js
let schemaNames = await database.getSchemaNames();
await database.hasSchema('public');
```

### List tables

```js
let tableNames = await database.getTableNames('public');
```

### Get tables with primaryKey, columns and constraints

```js
let tables = await database.getTables('public');
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

## Changelog and roadmap

See [CHANGELOG.md](CHANGELOG.md)


