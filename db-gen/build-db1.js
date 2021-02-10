const casual = require("casual");
const fs = require("fs");

const args = process.argv.slice(2);

let file_suffix_no = 100;
let n_person = 110;
let n_recruit = 10;
let n_applicant = n_person - n_recruit;

if (args.length > 0) {
    file_suffix_no = Number(args[0]);
    n_applicant = Number(args[0]);
    n_person = n_applicant + n_recruit;
}

if (args.length > 1) {
    n_recruit = Number(args[1]);
    n_person = n_applicant + n_recruit;
}

let person = [];
let recruit = [];
let applicant = [];
let application = [];
let availability = [];
let application_competence = [];
let status = [{id: 1, name: "Unhandled"}, {id: 2, name: "Accepted"}, {id: 3, name: "Rejected"}];
let competence = [{id: 1, name: "Korvgrillning"}, {id: 2, name: "Karuselldrift"}, {id: 3, name: "Popcornpoppare"}, {id: 4, name: "Lustigahusetkurre"},
    {id: 5, name: "Clown"}, {id: 6, name: "Jonglör"}, {id: 7, name: "Ballongfigur"}, {id: 8, name: "Styltperson"}];
let duration = [{id: 1, years: 0.5}, {id: 2, years: 1.0}, {id: 3, years: 1.5}, {id: 4, years: 2.0}, {id: 5, years: 2.5}, {id: 6, years: 3.0},
    {id: 7, years: 3.5}, {id: 8, years: 4.0}, {id: 9, years: 4.5}, {id: 10, years: 5.0}];
let version = [1, 1, 1, 2, 3];
let start = Math.floor(new Date("2021-02-07").getTime() / 1000);
let day = Math.floor(new Date("2021-02-08").getTime() / 1000) - start;
let n_applications_factor = 1.25;
let n_applications = n_applications_factor * n_applicant;
let n_avail_factor = 2.25;
let n_competence_factor = 3.25;
let n_avail_days_range = 240;

for (let i = 0; i < n_person; i++) {
    person.push({id: i + 1, first_name: casual.first_name, last_name: casual.last_name, username: casual.username, password: casual.password});
}

let temp = [];
console.log(n_applicant, n_recruit, n_person)
for (let i = 0; i < n_recruit; i++) {
    let num = randIndex(n_person);

    while (temp.indexOf(person[num].id) > -1) {
        num = randIndex(n_person);
    }

    temp.push(person[num].id);
}

temp.sort((a, b) => a - b);

for (let i = 0; i < n_recruit; i++) {
    recruit.push({person_id: temp[i]});
}

temp = [...Array(n_person).keys()].map(item => item + 1);

for (let i = 0; i < n_recruit; i++) {
    temp.splice(temp.indexOf(recruit[i].person_id), 1);
}

let email = [];
let ssn = [];
let dob = [];

for (let i = 0; i < n_applicant; i++) {
    let em = casual.email;
    let digits = casual.array_of_digits(n = 4);
    let dd = casual.date(format = "YYYYMMDD");
    let ss = dd + "-" + digits[0] + digits[1] + digits[2] + digits[3];

    while (email.indexOf(em) > -1) {
        em = casual.email;
    }

    while (ssn.indexOf(ss) > -1) {
        digits = casual.array_of_digits(n = 4);
        ss = dd + "-" + digits[0] + digits[1] + digits[2] + digits[3];
    }

    email.push(em);
    ssn.push(ss);
    dob.push(dd);
}

for (let i = 0; i < n_applicant; i++) {
    applicant.push({person_id: temp[i], email: email[i], ssn: ssn[i], dob: dob[i]});
}

let avail = [start];

for (let i = 1; i < n_avail_days_range; i++) {
    avail.push(avail[i - 1] + day);
}

rec = [];
temp = [];
let applied = [];
let count = 0;

for (let i = 0; i < recruit.length; i++) {
    rec.push(recruit[i].person_id);
}

for (let i = 0; i < n_person; i++) {
    if (rec.indexOf(i + 1) > -1) {
        temp.push(false);
    } else {
        temp.push(casual.coin_flip);
    }
}

for (let i = 0; i < 2; i++) {
    for (let j = 0; j < n_person; j++) {
        if (!temp[i] && rec.indexOf(i + 1) === -1) {
            temp[i] = casual.coin_flip;
        }
    }
}

for (let i = 0; i < n_person; i++) {
    if (temp[i]) {
       count++;
       applied[i] = 1;
    } else {
        applied[i] = 0;
    }
}

temp = [];

for (let i = 0; i < n_person; i++) {
    if (applied[i]) {
        temp.push(i);
    }
}

for (let i = 0; i < n_applications - count; i++) {
    let rand = randIndex(temp.length - 1);

    applied[temp[rand]]++;
}

let id = 1;
let avail_map = [];
let comp_count = 0;
let avail_count = 0;
let app_count = 0;
let competence_range = [...Array(competence.length).keys()].map(item => item + 1);
let duration_range = [...Array(duration.length).keys()].map(item => item + 1);
let app_comp_range = [];
let avail_range = [];

for (let i = 1; i <= Math.floor(2 * n_competence_factor); i++) {
    app_comp_range.push(i);
}

for (let i = 1; i <= Math.floor(2 * n_avail_factor); i++) {
    avail_range.push(i);
}

let max = 0;

for (let i = 0; i < applied.length; i++) {
    if (applied[i] > max) {
        max = applied[i]; // Math.max(...applied)
    }
}

for (let i = 0; i < max; i++) {
    for (let j = 0; j < applied.length; j++) {
        let rand = randIndex(status.length);

        if (applied[j] > i) {
            application.push({id: id, person_id: j + 1, status_id: version[rand], version: version[randIndex(status.length)]});
            app_count++;

            let num = app_comp_range[randIndex(app_comp_range.length)];
            let num2 = avail_range[randIndex(avail_range.length)];
            let cache = [];

            for (let k = 0; k < num; k++) {
                let competence_id = competence_range[randIndex(competence_range.length - 1)];

                while (cache.indexOf(competence_id) > -1) {
                    competence_id = competence_range[randIndex(competence_range.length - 1)];
                }

                cache.push(competence_id);
                application_competence.push({application_id: id, competence_id: competence_id, duration_id: duration_range[randIndex(duration_range.length - 1)]});
                comp_count++;
            }

            for (let k = 0; k < num2; k++) {
                let from_date = avail[randIndex(avail.length - 1)];
                let to_date = avail[randIndex(avail.length - 1)];

                while (to_date <= from_date || cache.indexOf(from_date) > -1) {
                    from_date = avail[randIndex(avail.length - 1)];
                    to_date = avail[randIndex(avail.length - 1)];
                }

                cache.push(from_date);
                availability.push({application_id: id, from_date: from_date, to_date: to_date});
                avail_count++;
            }

            id++;
        }

    }
}

function randIndex(max) {
    let rand = casual.integer(from = -1, to = max + 1);

    while (rand === -1 || rand === max + 1) {
        rand = casual.integer(from = -1, to = max + 1);
    }

    return rand;
}



//console.log(person)
console.log(recruit)
//console.log(applicant)
console.log(applied)
//console.log(availability)
//console.log(Math.max(...applied))
//console.log(application_competence)
console.log(applied.length)
console.log(app_count)
console.log(comp_count)
console.log(avail_count)
console.log(availability[availability.length - 1])

let json;

json = JSON.stringify(Object.assign({}, person));
fs.writeFile("./output/person_" + file_suffix_no + ".json", json, () => console.log("written person"));
json = JSON.stringify(Object.assign({}, recruit));
fs.writeFile("./output/recruiter_" + file_suffix_no + ".json", json, () => console.log("written recruiter"));
json = JSON.stringify(Object.assign({}, applicant));
fs.writeFile("./output/applicant_" + file_suffix_no + ".json", json, () => console.log("written applicant"));
json = JSON.stringify(Object.assign({}, application));
fs.writeFile("./output/application_" + file_suffix_no + ".json", json, () => console.log("written application"));
json = JSON.stringify(Object.assign({}, application_competence));
fs.writeFile("./output/application_competence_" + file_suffix_no + ".json", json, () => console.log("written application competence"));
json = JSON.stringify(Object.assign({}, competence));
fs.writeFile("./output/competence_" + file_suffix_no + ".json", json, () => console.log("written competence"));
json = JSON.stringify(Object.assign({}, duration));
fs.writeFile("./output/duration_" + file_suffix_no + ".json", json, () => console.log("written duration"));
json = JSON.stringify(Object.assign({}, availability));
fs.writeFile("./output/availability_" + file_suffix_no + ".json", json, () => console.log("written availability"));
json = JSON.stringify(Object.assign({}, status));
fs.writeFile("./output/status_" + file_suffix_no + ".json", json, () => console.log("written status"));


/*
casual not intended random


let c = 0;
for (let i = 0; i < 10000; i++) {
    let num = casual.integer(from = 0, to = 100);

    if (num === 99) {
        c++;
        console.log("i " + i, num);
    }
}
console.log("total", c)
console.log([...Array(n_person).keys()].map(item => item + 1)) */