import pg from "pg"
//const {Client} = require("pg");
let connectionString;
let sourceClient;
let destinationClient;

export const string = "string";
export const number = "number";
export const date = "date";
export const unixtime = "unixtime";

export function validate(config) {
    console.log("validation")

    if (!config.db_from) {
        throw new Error("Source database missing");
    }

    if (!config.db_to) {
        throw new Error("Destination database missing");
    }
    
    if (config.constraints && config.constraints.references) {
        Object.keys(config.constraints.references).forEach(key => {
            if (config.constraints.references.hasOwnProperty(key)) {
                console.log(key)
            }
        });
    }

    connectionString = "postgres://postgres@localhost:5432/" + config.db_from;
    sourceClient = new pg.Client({connectionString});
    connectionString = "postgres://postgres@localhost:5432/" + config.db_to;
    destinationClient = new pg.Client({connectionString});
    sourceClient.connect();
    destinationClient.connect();
}

export function transform(config) {

}

export function build(config) {
    console.log("build")
    let conf = {};
    let tables = [];
    let order = [];
    let refs = config.constraints;

    if (refs && refs.references) {
        refs = refs.references;
        console.log("build2")

        Object.keys(refs).forEach(key => {
            if (refs.hasOwnProperty(key)) {
                console.log("build3")
                for (let i = 0; i < refs[key].length; i++) {
                    if (order.indexOf(refs[key][i]) === -1) {
                        order.push(refs[key][i]);
                    }
                }

                if (order.indexOf(key) === -1 && refs[key].length) {
                    order.push(key);
                }
            }
        });

        let map = [];
        console.log("build4 " + order.length)
        console.log(order)
        for (let i = 0; i < order.length; i++) {
            map.push(i);
            shuffle(refs, order, map, i);
        }
        console.log(order)
    }

    conf.order = order;
    conf.fetch = [];

    if (config.map) {
        Object.keys(config.map).forEach(map => {
            conf.fetch.push(map);

            if (config.map.hasOwnProperty(map)) {
                console.log("build5", map)
                Object.keys(config.map[map]).forEach(key => {
                    if (config.map[map].hasOwnProperty(key)) {
                        console.log("build6", key)
                        if (config.map[map][key] && !exists(tables, "table", config.map[map][key].table)) {
                            console.log("build7", tables)
                            tables.push({table: config.map[map][key].table});
                        }
                    }
                })
            }
        });
    }

    conf.insert = tables;

    Object.keys(config.map).forEach(key => {
        
    });

    return conf;
}

export function select(config, table) {
    console.log("selecttt")
    return sourceClient.query("select * from " + table);
}

export function insert(config, table, cols = [], vals = []) {
    if (!vals.length) {
        throw new Error("Nothing to insert");
    }

    if (cols.length !== vals.length) {
        throw new Error("Number of values must match number of columns on insert");
    }

    let query = "insert into " + table + "(";

    for (let i = 0; i < cols.length; i++) {
        query += cols[i] + ", ";
    }

    query = query.slice(0, query.length - 2);
    query += ") values (";

    for (let i = 1; i <= vals.length; i++) {
        query += "$" + i + ", ";
    }

    query = query.slice(0, query.length - 2);
    query += ")";
}

export function close() {
    sourceClient.end();
    destinationClient.end();
}

function shuffle(refs, order, map, i) {
    console.log("shuffle")
    Object.keys(refs).forEach(key => {
        if (refs.hasOwnProperty(key)) {
            if (key === order[i]) {
                let keys = refs[key];
                let min = order.indexOf[key];

                keys.forEach(ke => {
                    let index = order.indexOf(ke);
                    
                    if (map[index] < map[min]) {
                        let temp = order[index];
                        order[index] = key;
                        order[i] = temp;
                        min = map[index];
                    }
                });
            }
        }
    });
}

function exists(arr, key, val) {
    console.log("exists", arr, key, val)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
            return true;
        }
    }

    return false;
}