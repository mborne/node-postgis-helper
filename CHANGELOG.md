# Changelog

## 0.1 - Database

Init project to stop duplicating code in nodejs projects (data loaders, express API,...)

## 0.2 - Catalog (in progress)

Add hability to describe and retreive main table properties and generate model doc :

* [x] `table.schema`
* [x] `table.name`
* [ ] `table.title` : display title for the table (default = name)
* [ ] `table.description` : description of the table (default = null)
* [x] `table.is_view` (TODO move to `tags`?)
* [x] `table.primaryKey` : `string|string[]`
* [x] `table.columns`
  * [x] `table.columns[*].name`
  * [ ] `table.columns[*].title`
  * [ ] `table.columns[*].description`
  * [x] `table.columns[*].type` : PostgreSQL type (ex : `geometry(Point,4326)`)
  * [x] `table.columns[*].is_nullable`
  * [ ] `table.columns[*].references`

* [ ] `helper.parseType(column.type)`
    * [ ] `full_name` : original type name (ex : ̀ geometry(Point,4326)`)
    * [ ] `short_name` : short name (ex : `geometry`)
    * [ ] `params` : type params (ex : `["Point","4326"]`)

* [ ] `helper.toJsonType(column.type)` (relying on parseType)

Add converter to doc and other schema :

* [ ] `helper.toFlatTable(table)` : convert to CSV storable table
* [ ] `helper.toMarkdown(table)` : convert to markdown
* [ ] `helper.toJsonSchema(table)` : converts to JSON object definition (swagger)
* [ ] `helper.toGeoJsonSchema(table,options)` : convert to JSON object definition for GeoJSON rendering (`object` to `Feature` conversion)
  * [ ] Converts to GeoJSON
  * [ ] Support `options.geometryName` (with default behavior = GeoServer, first one or last one, don't remember)


**IDEAS BELLOW : ORDER MAY CHANGE**

## 0.3 - Hability to create SQL schema from models

Add helper to manage PostgreSQL schema :

* [ ] Create schema
  * [ ] `helper.getSqlCreateSchema(schema)`
  * [ ] `database.createSchema(schemaName)`
* [ ] Create tables
  * [ ] `helper.getSqlCreateTable(table)`
  * [ ] `database.createTable(table)`


## 0.4 - Helpers to write API

* [ ] Select rows
  * [ ] `helper.getQuerySelect(table,options)`
    * [ ] `options.columns` : `?_columns=id,name,the_geom`
    * [ ] `options.geometryFormat` : `EKWB|GeoJSON`
    * [ ] `options.geometryName` : `?_geometry=the_geom`
    * [ ] `options.filter` : `?key=value`
    * [ ] `options.limit` : `?_start=id%20ASC`
    * [ ] `options.start` : `?_start=id%20ASC`
    * [ ] `options.sort` : `?_sort=id%20ASC`
  * [ ] `database.find(table,options)`

* [ ] Insert row
  * [ ] `helper.getQueryInsert(table,data)`
  * [ ] `database.insert(table,data)`

* [ ] Update row (by primary key)
  * [ ] `helper.getQueryUpdate(table,data)`
  * [ ] `database.update(table,data)`

* [ ] Delete row(s)
  * [ ] `helper.getQueryDelete(table,data)`
  * [ ] `database.delete(table,data)`
