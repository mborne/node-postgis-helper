DROP SCHEMA IF EXISTS sample CASCADE;

CREATE SCHEMA sample;

CREATE TABLE sample.user (
    id serial primary key,
    username text
);

INSERT INTO sample.user (username) VALUES ('titi');
INSERT INTO sample.user (username) VALUES ('toto');
