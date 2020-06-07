CREATE SCHEMA IF NOT EXISTS adminexpress;

-- Région
CREATE TABLE adminexpress.region (
    id text,
    nom_reg text,
    nom_reg_m text,
    insee_reg text UNIQUE,
    chf_reg text,
    geom geometry(MultiPolygon,4326) NOT NULL,
    PRIMARY KEY (id)
);

-- Département
CREATE TABLE adminexpress.departement (
    id text,
    nom_dep text,
    nom_dep_m text,
    insee_dep text UNIQUE,
    insee_reg text REFERENCES adminexpress.region(insee_reg),
    chf_dep text,
    geom geometry(MultiPolygon,4326) NOT NULL,
    PRIMARY KEY (id)
);

-- Commune
CREATE TABLE adminexpress.commune (
    id text,
    type text,
    nom_com text,
    nom_com_m text,
    insee_com text UNIQUE,
    statut text,
    population numeric(8,0),
    insee_arr text,
    nom_dep text,
    insee_dep text REFERENCES adminexpress.departement(insee_dep),
    nom_reg text,
    insee_reg text,
    code_epci text,
    geom geometry(MultiPolygon,4326) NOT NULL,
    PRIMARY KEY (id)
);
