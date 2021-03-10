const {Client} = require("pg");
const fs = require("fs");
const connectionString = "postgres://postgres@localhost:5432/recruit";
const client = new Client({connectionString});

const args = process.argv.slice(2);
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
client.connect();

let now = new Date().getTime();

query().then(() => {
    let end = new Date().getTime();
    console.log("Done in: " + (end - now) + " ms.")
});

async function query() {
    let vals = Object.values(person);

    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into person values ($1, $2, $3, $4, $5)", [vals[i].id, vals[i].first_name, vals[i].last_name, vals[i].username, vals[i].password])
  //      .then(() => console.log("dones person " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(recruiter);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into recruiter values ($1)", [vals[i].person_id])
  //      .then(() => console.log("dones recruit " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(applicant);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into applicant values ($1, $2, $3, $4)", [vals[i].person_id, vals[i].email, vals[i].ssn, vals[i].dob])
   //     .then(() => console.log("dones applicant " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(competence);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into competence values ($1, $2)", [vals[i].id, vals[i].name])
 //       .then(() => console.log("dones competence " + i));
    }

    vals = Object.values(duration);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into duration values ($1, $2)", [vals[i].id, vals[i].years])
  //      .then(() => console.log("dones duration " + i));
    }

    vals = Object.values(status);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into status values ($1, $2)", [vals[i].id, vals[i].name])
  //      .then(() => console.log("dones status " + i + " " + vals[i].id + " " + vals[i].name));
    }

    vals = Object.values(application);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into application values ($1, $2, $3, $4)", [vals[i].id, vals[i].person_id, vals[i].status_id, vals[i].version])
//        .then((t) => console.log("dones application " + i + " " + typeof(vals[i]), vv));
    //    .catch(err => console.log("err apps ", vv));
    }

    vals = Object.values(application_competence);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into application_competence values ($1, $2, $3)", [vals[i].application_id, vals[i].competence_id, vals[i].duration_id])
  //      .then(() => console.log("dones application_competence " + i));
    }

    vals = Object.values(availability);
    for (let i = 0; i < vals.length; i++) {
        await client.query("insert into availability values ($1, $2, $3)", [vals[i].application_id, vals[i].from_date, vals[i].to_date])
 //       .then(() => console.log("dones availability " + i));
    }

    client.end();
}