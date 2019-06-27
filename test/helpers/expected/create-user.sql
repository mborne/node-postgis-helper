CREATE TABLE sample.user (
    id serial,
    username text,
    birthdate date,
    is_admin boolean,
    location geometry(Point,4326),
    PRIMARY KEY (id)
);