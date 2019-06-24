CREATE EXTENSION IF NOT EXISTS postgis;

DROP SCHEMA IF EXISTS sample CASCADE;

CREATE SCHEMA sample;

-- a table with a simple primary key
CREATE TABLE sample.user (
    id serial primary key,
    username text,
    birthdate date,
    is_admin boolean DEFAULT 'F',
    location geometry(Point,4326)
);

INSERT INTO sample.user (username,birthdate) VALUES ('titi','1984-01-01');
INSERT INTO sample.user (username,birthdate) VALUES ('toto','1986-01-01');

-- a table with a composite primary key
CREATE TABLE sample.building_h (
    id uuid,
    version integer DEFAULT 1,
    deleted boolean DEFAULT 'F',

    name text NOT null,
    owner_id integer REFERENCES sample.user(id),
    geometry geometry(Polygon,4326),

    PRIMARY KEY(id,version)
);

-- a table with a composite foreign key
CREATE TABLE sample.building_owner (
    id serial primary key,

    building_id uuid,
    building_version integer,

    owner_id integer REFERENCES sample.user(id),

    FOREIGN KEY(building_id,building_version) REFERENCES sample.building_h(id,version)
);

