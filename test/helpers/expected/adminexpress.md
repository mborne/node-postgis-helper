# adminexpress

## region

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| id        | `text`                        | N        |             |
| nom_reg   | `text`                        | N        |             |
| nom_reg_m | `text`                        | N        |             |
| insee_reg | `text`                        | N        |             |
| chf_reg   | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | Y        |             |

## departement

| Name      | Type                          | Required | Description |
| --------- | ----------------------------- | -------- | ----------- |
| id        | `text`                        | N        |             |
| nom_dep   | `text`                        | N        |             |
| nom_dep_m | `text`                        | N        |             |
| insee_dep | `text`                        | N        |             |
| insee_reg | `text`                        | N        |             |
| chf_dep   | `text`                        | N        |             |
| geom      | `geometry(MultiPolygon,4326)` | Y        |             |

## commune

| Name       | Type                          | Required | Description |
| ---------- | ----------------------------- | -------- | ----------- |
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
| geom       | `geometry(MultiPolygon,4326)` | Y        |             |
