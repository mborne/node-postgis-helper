# How to explore schema?

## Retrieve user tables and views

```sql
select
	table_schema,
	table_name,
	table_type
from information_schema.tables
	where table_schema not like 'pg_%'
  	  and table_schema != 'information_schema'
;
```


## Retrieve columns for a given table

```sql
SELECT
    a.attname as name,
    format_type(a.atttypid, a.atttypmod) AS type,
    (a.attnotnull = false) as is_nullable
from pg_attribute a
    where a.attrelid = ('sample.poi_h')::regclass
    and a.attnum > 0
;
```

## Retrieve columns with primary key information

This relies on indexes to add `is_primary` information

```sql
SELECT
    a.attname as name,
    format_type(a.atttypid, a.atttypmod) AS type,
    (a.attnotnull = false) as is_nullable,
    (
        select count(*) from pg_catalog.pg_index i
        where a.attrelid = i.indrelid
        and a.attnum = ANY(i.indkey)
        and i.indisprimary
    ) = 1 as is_primary
from pg_attribute a
    where a.attrelid = ('sample.poi_h')::regclass
    and a.attnum > 0
;
```

## Retrieve primary keys for a given table

```sql
select
	tc.constraint_schema,
	tc.constraint_name,
	kcu.column_name,
	kcu.ordinal_position
from information_schema.table_constraints tc
	JOIN information_schema.key_column_usage AS kcu
	      ON tc.constraint_name = kcu.constraint_name
where tc.constraint_type = 'PRIMARY KEY'
  and tc.table_schema = 'sample'
  and tc.table_name = 'poi_h'
order by kcu.ordinal_position
;
```