import pg from "pg"

const args = process.argv.slice(2);
const source = args.length ? args[0] : "recruit_original";
const destination = args.length > 1 ? args[1] : "recruit";
const replaceNull = args.length > 2 && args[2] !== "drop" ? true : false;
const replaceChar = args.length > 3 ? args[3] : "";
const dropMissing = args.length > 2 && args[2] === "drop" ? true : false;
let dropped = {person: []};


let connectionString = "postgres://postgres@localhost:5432/" + source;
const sourceClient = new pg.Client({connectionString});
connectionString = "postgres://postgres@localhost:5432/" + destination;
const destinationClient = new pg.Client({connectionString});

(async () => {
    await sourceClient.connect();
    await destinationClient.connect();

    let person = await sourceClient.query("select * from person");
    let availability = await sourceClient.query("select * from availability");
    let competence = await sourceClient.query("select * from competence");
    let competence_profile = await sourceClient.query("select * from competence_profile");
    let application = {availability: availability.rows, application_competence: competence_profile.rows};

    let db = prepare();

    db.dropConstraints()
        .then(() => db.seed())
        .then(() => db.insert(person.rows, "person"))
        .then(() => db.insert(competence.rows, "competence"))
        .then(() => db.insert(application, "application"))
        .then(() => db.reactivateConstraints());


    // sourceClient.end();
    // destinationClient.end();
})();

function nullConstraints() {
    let config = {};

    config.person = {first_name: true, last_name: true, username: true, password: true};
    config.recruit = {};
    config.applicant = {email: true, ssn: true}; // person_id: true, 
    config.application = {person_id: true, status_id: true, version: true};
    config.application_competence = {duration_id: true}; // application_id: true, competence_id: true,
    config.competence = {name: true};
    config.duration = {years: true};
    config.availability = {to_date: false}; // application_id: true, from_date: true,
    config.status = {name: true};

    return config;
}

function uniqueConstraints() {
    let config = {};

    config.person = {username: true};
    config.applicant = {email: true, ssn: true};

    return config;
}

function prepare() {
    let prep = {
        dropConstraints: function(param)  {
            return (async () => {
                await setConstraint("drop");
            })();
        },
        reactivateConstraints: function(param) {
            return (async () => {
                await setConstraint("set");
            })();
        },
        seed: function() {
            let all = [];
            let query;

            return (async () => {
                query = "insert into status (name) values ('Unhandled'), ('Accepted'), ('Rejected')";
                all.push(destinationClient.query(query));

                query = "insert into duration (years) values (0.5), (1.0), (1.5), (2), (2.5), (3.0), (3.5), (4.0), (4.5), (5)";
                all.push(destinationClient.query(query));

                return Promise.all(all);
            })();
        },
        insert: function(data, type) {
            let query;
            let all = [];

            switch (type) {
                case "person":
                return (async () => {
                    let al = [];
                    let id = 1;

                    data.forEach((person) => {
                        if (dropMissing && (!check([person.name, person.surname, person.username, person.password])
                            || (person.role_id === 2 && !check([person.email, person.ssn])))) {
                            dropped.person.push(id);
                            return;
                        }
                        
                        query = "insert into person (first_name, last_name, username, password) values ($1, $2, $3, $4) returning *";
                        al.push(destinationClient.query(query, [get(person.name), get(person.surname), get(person.username), get(person.password)]));
                        id++;
                    });

                    return Promise.all(al).then(res => {
                        al = [];
                        let i = 0;

                        res.forEach(item => {
                            let inserted = item.rows[0];
                            let person = data[i++];

                            if (person.role_id === 1) {
                                query = "insert into recruiter (person_id) values ($1)";
                                al.push(destinationClient.query(query, [inserted.id]));
                            } else {
                                query = "insert into applicant (person_id, email, ssn) values ($1, $2, $3)";
                                al.push(destinationClient.query(query, [inserted.id, get(person.email), get(person.ssn)]));
                            }
                        });
                        
                        return Promise.all(al);
                    });
                })();
                break;
                case "competence":
                return (async () => {
                    data.forEach(async (competence) => {
                        if (dropMissing && !check([competence.name])) {
                            return;
                        }

                        query = "insert into competence (name) values ($1)";
                        await destinationClient.query(query, [get(competence.name)]);
                    });
                })();
                break;
                case "application":
                return (async () => {
                    let {availability, application_competence} = data;
                    let all = [];
                    let cache = [];
                    let inserted;

                    availability.forEach(async avail => {
                        if (cache.indexOf(avail.person_id) === -1) {
                            if (!check([avail.person_id]) || dropped.person.indexOf(avail.person_id) > -1) {
                                return;
                            }

                            query = "insert into application (person_id, status_id, version) values ($1, $2, $3) returning *";
                            all.push(destinationClient.query(query, [get(avail.person_id), 1, 1]));
                            cache.push(avail.person_id);
                        }                        
                    });

                    return Promise.all(all).then(res => {
                        all = [];

                        if (!res.length) {
                            return this;
                        }

                        availability.forEach(avail => {
                            if (dropMissing && !check([avail.from_date, avail.to_date])) {
                                return;
                            }

                            let inserted;
                            let from_date = new Date(avail.from_date).getTime();
                            let to_date = new Date(avail.to_date).getTime();
                            
                            for (let i = 0; i < res.length; i++) {
                                inserted = res[i].rows[0];

                                if (inserted.person_id === avail.person_id) {
                                    break;
                                }
                            }

                            query = "insert into availability (application_id, from_date, to_date) values ($1, $2, $3)";
                            all.push(destinationClient.query(query, [inserted.id, get(from_date), get(to_date)]));
                        });

                        application_competence.forEach(app_comp => {
                            if (!check([app_comp.competence_id])) {
                                return;
                            }

                            let inserted;
                            query = "select id from duration where years = $1";
                            destinationClient.query(query, [app_comp.years_of_experience]).then(res => {
                                let id = res.rows[0].id;

                                query = "insert into application_competence (application_id, competence_id, duration_id) values ($1, $2, $3)";
                                all.push(destinationClient.query(query, [inserted.id, get(app_comp.competence_id), id]));
                            });

                            for (let i = 0; i < res.length; i++) {
                                inserted = res[i].rows[0];

                                if (inserted.person_id === app_comp.person_id) {
                                    break;
                                }
                            }
                        });

                        return Promise.all(all)
                    });
                })();
                break;
                default:
                break;
            }
        },
        close: function() {
            sourceClient.end();
            destinationClient.end();
        }
    };

    return prep;

    async function setConstraint(param) {
        let cons = nullConstraints();
        let uCons = uniqueConstraints();

        Object.keys(cons).forEach(table => {
            if (cons.hasOwnProperty(table)) {
                Object.keys(cons[table]).forEach(column => {
                    if (cons[table].hasOwnProperty(column)) {
                        if (cons[table][column]) {
                            let query = "alter table " + table + " alter column " 
                                + column + " " + param + " not null";
                            console.log(query);

                            (async () => {
                                try {
                                    await destinationClient.query(query);
                                } catch (e) {
                                    console.log(e.message);
                                }
                            })();
                            
                            

                  /*          if (uCons[table] && uCons[table][column]) {
                                param = param === "set" ? "add" : param;
                                query = "alter table " + table + " " + param + " unique " + column;

                                destinationClient.query(query);
                            } */
                        }
                    }
                });
            }
        });
    }

    function get(val) {
        return val === null ? (replaceNull ? replaceChar : val) : val;
    }

    function check(vals) {
        let exists = true;

        vals.forEach(val => {
            if (val === null) {
                exists = false;
            }
        });

        return exists;
    }
}
