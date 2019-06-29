# adminexpress

## region

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| gid       | `integer`                     | Y        |             |
| id        | `text`                        | N        |             |
| nom_reg   | `text`                        | N        |             |
| nom_reg_m | `text`                        | N        |             |
| insee_reg | `text`                        | N        |             |
| chf_reg   | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | N        |             |

## departement

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| gid       | `integer`                     | Y        |             |
| id        | `text`                        | N        |             |
| nom_dep   | `text`                        | N        |             |
| nom_dep_m | `text`                        | N        |             |
| insee_dep | `text`                        | N        |             |
| insee_reg | `text`                        | N        |             |
| chf_dep   | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | N        |             |

## epci

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| gid       | `integer`                     | Y        |             |
| id        | `text`                        | N        |             |
| code_epci | `text`                        | N        |             |
| nom_epci  | `text`                        | N        |             |
| type_epci | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | N        |             |

## arrondissement_departemental

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| gid       | `integer`                     | Y        |             |
| id        | `text`                        | N        |             |
| nom_arr   | `text`                        | N        |             |
| nom_arr_m | `text`                        | N        |             |
| insee_arr | `text`                        | N        |             |
| insee_dep | `text`                        | N        |             |
| insee_reg | `text`                        | N        |             |
| chf_arr   | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | N        |             |

## commune

| Name       | Type                          | Required | Description |
| ---------- | ----------------------------- | -------- | ----------- |
| gid        | `integer`                     | Y        |             |
| id         | `text`                        | N        |             |
| type       | `text`                        | N        |             |
| nom_com    | `text`                        | N        |             |
| nom_com_m  | `text`                        | N        |             |
| insee_com  | `text`                        | N        |             |
| statut     | `text`                        | N        |             |
| population | `numeric(8,0)`                | N        |             |
| insee_arr  | `text`                        | N        |             |
| nom_dep    | `text`                        | N        |             |
| insee_dep  | `text`                        | N        |             |
| nom_reg    | `text`                        | N        |             |
| insee_reg  | `text`                        | N        |             |
| code_epci  | `text`                        | N        |             |
| geom       | `geometry(MultiPolygon,4326)` | N        |             |

## chef_lieu

| Name      | Type                        | Required | Description |
| --------- | --------------------------- | -------- | ----------- |
| gid       | `integer`                   | Y        |             |
| id        | `text`                      | N        |             |
| nom_chf   | `text`                      | N        |             |
| statut    | `text`                      | N        |             |
| insee_com | `text`                      | N        |             |
| geom      | `geometry(MultiPoint,4326)` | N        |             |
