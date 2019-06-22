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

## TODO

### 0.2 - Catalog

Add hability to retreive main table properties :

* [x] `table.schema`
* [x] `table.name`
* [ ] `table.is_view`
* [x] `table.primaryKey` : `string|string[]`
* [x] `table.columns`
  * [x] `table.columns[*].name`
  * [x] `table.columns[*].type`
  * [x] `table.columns[*].is_nullable`
  * [ ] `table.columns[*].references`


Add helper to parse PostgreSQL/PostGIS type and convert to JSON type :

* [ ] `helper.decodePgType(pg_type)`
    * [ ] `pg_type` : original type
    * [ ] `json_type` : mapped JSON type
    * [ ] `limit` : max size for character varying
    * [ ] `is_geometry` : boolean
    * [ ] `geometry_type` : Geometry, Point, LineString, Polygon,...
    * [ ] `geometry_srid` : null, 4326, ...

Add converter to other schema :

* [ ] `helper.toJsonSchema(table)` : converts to JSON object definition
* [ ] `helper.toGeoJsonSchema(table,options)`
  * [ ] Converts to GeoJSON
  * [ ] Support `options.geometryName` (with default behavior = GeoServer, first one or last one, don't remember)
* [ ] `helper.toTableSchema(table)`


### 0.3 - Helpers to write API

* [ ] `helper.select(table,options)`
  * [ ] `options.columns` : `?_columns=id,name,the_geom`
  * [ ] `options.geometryFormat` : `EKWB|GeoJSON`
  * [ ] `options.geometryName` : `?_geometry=the_geom`
  * [ ] `options.filter` : `?key=value`
  * [ ] `options.limit` : `?_start=id%20ASC`
  * [ ] `options.start` : `?_start=id%20ASC`
  * [ ] `options.sort` : `?_sort=id%20ASC`

