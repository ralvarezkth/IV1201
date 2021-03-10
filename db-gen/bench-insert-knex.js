const fs = require("fs");
const connectionString = "postgres://postgres@localhost:5432/recruit";
const client = require("knex")({
    client: "pg",
    connection: connectionString
});

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
//client.connect();

let now = new Date().getTime();

query().then(() => {
    let end = new Date().getTime();
    console.log("Done in: " + (end - now) + " ms.")
});

async function query() {
    let vals = Object.values(person);

    for (let i = 0; i < vals.length; i++) {
        await client("person").insert({id: vals[i].id, first_name: vals[i].first_name, last_name: vals[i].last_name, username: vals[i].username, password: vals[i].password})
  //      .then(() => console.log("dones person " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(recruiter);
    for (let i = 0; i < vals.length; i++) {
        await client("recruiter").insert({person_id: vals[i].person_id})
  //      .then(() => console.log("dones recruit " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(applicant);
    for (let i = 0; i < vals.length; i++) {
        await client("applicant").insert({person_id: vals[i].person_id, email: vals[i].email, ssn: vals[i].ssn, dob: vals[i].dob})
   //     .then(() => console.log("dones applicant " + i))
        .catch(err => console.log("err", err, vals[i]));
    }

    vals = Object.values(competence);
    for (let i = 0; i < vals.length; i++) {
        await client("competence").insert({id: vals[i].id, name: vals[i].name})
 //       .then(() => console.log("dones competence " + i));
    }

    vals = Object.values(duration);
    for (let i = 0; i < vals.length; i++) {
        await client("duration").insert({id: vals[i].id, years: vals[i].years})
  //      .then(() => console.log("dones duration " + i));
    }

    vals = Object.values(status);
    for (let i = 0; i < vals.length; i++) {
        await client("status").insert({id: vals[i].id, name: vals[i].name})
  //      .then(() => console.log("dones status " + i + " " + vals[i].id + " " + vals[i].name));
    }

    vals = Object.values(application);
    for (let i = 0; i < vals.length; i++) {
        await client("application").insert({id: vals[i].id, person_id: vals[i].person_id, status_id: vals[i].status_id, version: vals[i].version})
//        .then((t) => console.log("dones application " + i + " " + typeof(vals[i]), vv));
    //    .catch(err => console.log("err apps ", vv));
    }

    vals = Object.values(application_competence);
    for (let i = 0; i < vals.length; i++) {
        await client("application_competence").insert({application_id: vals[i].application_id, competence_id: vals[i].competence_id, duration_id: vals[i].duration_id})
  //      .then(() => console.log("dones application_competence " + i));
    }

    vals = Object.values(availability);
    for (let i = 0; i < vals.length; i++) {
        await client("availability").insert({application_id: vals[i].application_id, from_date: vals[i].from_date, to_date: vals[i].to_date})
 //       .then(() => console.log("dones availability " + i));
    }

    client.destroy();
}