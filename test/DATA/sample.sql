CREATE EXTENSION IF NOT EXISTS postgis;

DROP SCHEMA IF EXISTS sample CASCADE;

CREATE SCHEMA sample;

CREATE TABLE sample.user (
    id serial primary key,
    username text,
    birthdate date,
    is_admin boolean DEFAULT 'F',
    location geometry(Point,4326)
);

INSERT INTO sample.user (username,birthdate) VALUES ('titi','1984-01-01');
INSERT INTO sample.user (username,birthdate) VALUES ('toto','1986-01-01');

-- table with composite primary key
CREATE TABLE sample.building_h (
    id uuid,
    version integer DEFAULT 1,
    deleted boolean DEFAULT 'F',

    name text NOT null,
    owner_id integer references sample.user(id),
    geometry geometry(Polygon,4326),

    primary key(id,version)
);

