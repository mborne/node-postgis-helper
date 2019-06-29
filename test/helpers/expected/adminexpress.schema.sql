CREATE SCHEMA IF NOT EXISTS adminexpress;

-- region
CREATE TABLE adminexpress.region (
    gid integer,
    id text,
    nom_reg text,
    nom_reg_m text,
    insee_reg text,
    chf_reg text,
    geom geometry(MultiPolygon,4326),
    PRIMARY KEY (gid)
);

-- departement
CREATE TABLE adminexpress.departement (
    gid integer,
    id text,
    nom_dep text,
    nom_dep_m text,
    insee_dep text,
    insee_reg text,
    chf_dep text,
    geom geometry(MultiPolygon,4326),
    PRIMARY KEY (gid)
);

-- epci
CREATE TABLE adminexpress.epci (
    gid integer,
    id text,
    code_epci text,
    nom_epci text,
    type_epci text,
    geom geometry(MultiPolygon,4326),
    PRIMARY KEY (gid)
);

-- arrondissement_departemental
CREATE TABLE adminexpress.arrondissement_departemental (
    gid integer,
    id text,
    nom_arr text,
    nom_arr_m text,
    insee_arr text,
    insee_dep text,
    insee_reg text,
    chf_arr text,
    geom geometry(MultiPolygon,4326),
    PRIMARY KEY (gid)
);

-- commune
CREATE TABLE adminexpress.commune (
    gid integer,
    id text,
    type text,
    nom_com text,
    nom_com_m text,
    insee_com text,
    statut text,
    population numeric(8,0),
    insee_arr text,
    nom_dep text,
    insee_dep text,
    nom_reg text,
    insee_reg text,
    code_epci text,
    geom geometry(MultiPolygon,4326),
    PRIMARY KEY (gid)
);

-- chef_lieu
CREATE TABLE adminexpress.chef_lieu (
    gid integer,
    id text,
    nom_chf text,
    statut text,
    insee_com text,
    geom geometry(MultiPoint,4326),
    PRIMARY KEY (gid)
);
