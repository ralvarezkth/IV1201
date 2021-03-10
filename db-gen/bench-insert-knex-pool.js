const fs = require("fs");
const connectionString = "postgres://postgres@localhost:5432/recruit";
const args = process.argv.slice(2);

let min = 2;
let max = 10;

if (args.length === 2) {
    min = Number(args[1]);
}

if (args.length === 3) {
    max = Number(args[2]);
}

let co = 1;

const client = require("knex")({
    client: "pg",
    connection: connectionString,
    pool: {min: min, max: max}
});

/*
,
        afterCreate: function(conn, done) {
            conn.query("select count(*) from person;", function(err) {
                console.log("conn " + co++)
                done(err, conn);
            })
        }}
 */

console.log(args)
const size = args.length ? args[0] : 100;
const person = JSON.parse(fs.readFileSync("./output/person_" + size + ".json"));
const recruiter = JSON.parse(fs.readFileSync("./output/recruiter_" + size + ".json"));
const applicant = JSON.parse(fs.readFileSync("./output/applicant_" + size + ".json"));
const application = JSON.parse(fs.readFileSync("./output/application_" + size + ".json"));
const application_competence = JSON.parse(fs.readFileSync("./output/application_competence_" + size + ".json"));
const competence = JSON.parse(fs.readFileSync("./output/competence_" + size + ".json"));
const duration = JSON.parse(fs.readFileSync("./output/duration_" + size + ".json"));
const availability = JSON.parse(fs.readFileSync("./output/availability_" + size + ".json"));
const status = JSON.parse(fs.readFileSync("./output/status_" + size + ".json"));

console.log("connecting")
//client.connect();

let now = new Date().getTime();

query().then(() => {
    let end = new Date().getTime();
    console.log("Done in: " + (end - now) + " ms.")
});

async function query() {
    let vals = Object.values(person);

    for (let i = 0; i < vals.length; i++) {
        if (i < 2) console.log("person " + i)
        await insertPerson(vals[i]);
    }

    vals = Object.values(recruiter);
    for (let i = 0; i < vals.length; i++) {
        if (i < 2) console.log("recruiter " + i)
        await insertRecruiter(vals[i]);
    }

    vals = Object.values(applicant);
    for (let i = 0; i < vals.length; i++) {
        await insertApplicant(vals[i]);
    }

    vals = Object.values(competence);
    for (let i = 0; i < vals.length; i++) {
        await insertCompetence(vals[i]);
    }

    vals = Object.values(duration);
    for (let i = 0; i < vals.length; i++) {
        await insertDuration(vals[i]);
    }

    vals = Object.values(status);
    for (let i = 0; i < vals.length; i++) {
        await insertStatus(vals[i]);
    }

    vals = Object.values(application);
    for (let i = 0; i < vals.length; i++) {
         insertApplication(vals[i]);
    }

    vals = Object.values(application_competence);
    for (let i = 0; i < vals.length; i++) {
        await insertApplication_competence(vals[i]);
    }

    vals = Object.values(availability);
    for (let i = 0; i < vals.length; i++) {
        await insertAvailability(vals[i]);
    }

    client.destroy();
}

async function insertPerson(vals) {
          await client.raw("insert into person values (?, ?, ?, ?, ?)", [vals.id, vals.first_name, vals.last_name, vals.username, vals.password])
    //      .then(() => console.log("dones person " + i))
          .catch(err => console.log("err", err, vals));
}

async function insertRecruiter(vals) {
          await client.raw("insert into recruiter values (?)", [vals.person_id])
    //      .then(() => console.log("dones recruit " + i))
          .catch(err => console.log("err", err, vals));
}

async function insertApplicant(vals) {
         await client.raw("insert into applicant values (?, ?, ?, ?)", [vals.person_id, vals.email, vals.ssn, vals.dob])
    //     .then(() => console.log("dones applicant " + i))
         .catch(err => console.log("err", err, vals));
}

async function insertCompetence(vals) {
           await client.raw("insert into competence values (?, ?)", [vals.id, vals.name])
    //       .then(() => console.log("dones competence " + i));
}

async function insertDuration(vals) {
          await client.raw("insert into duration values (?, ?)", [vals.id, vals.years])
    //      .then(() => console.log("dones duration " + i));
}

async function insertStatus(vals) {
          await client.raw("insert into status values (?, ?)", [vals.id, vals.name])
    //      .then(() => console.log("dones status " + i + " " + vals.id + " " + vals.name));
}

async function insertApplication(vals) {
            await client.raw("insert into application values (?, ?, ?, ?)", [vals.id, vals.person_id, vals.status_id, vals.version])
    //        .then((t) => console.log("dones application " + i + " " + typeof(vals[i]), vv));
        //    .catch(err => console.log("err apps "));
}

async function insertApplication_competence(vals) {
          await client.raw("insert into application_competence values (?, ?, ?)", [vals.application_id, vals.competence_id, vals.duration_id])
    //      .then(() => console.log("dones application_competence " + i));
}

async function insertAvailability(vals) {
           await client.raw("insert into availability values (?, ?, ?)", [vals.application_id, vals.from_date, vals.to_date])
    //       .then(() => console.log("dones availability " + i));
}