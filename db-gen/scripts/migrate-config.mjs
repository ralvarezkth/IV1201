import {string, number, unixtime} from "./migrate-util.mjs"

const person = {
    person_id: {table: "person", col: "id"},
    name: {table: "person", col: "first_name"},
    surname: {table: "person", col: "last_name"},
    ssn: {table: "applicant", col: "ssn"},
    email: {table: "applicant", col: "email"},
    password: {table: "person", col: "password"},
    role_id: null,
    username: {table: "person", col: "username"}
};

export default {
    db_from: "recruit_original",
    db_to: "recruit",
    map: {
        person
    },
    constraints: {
        allowMissing: true,
        references: {
            applicant: ["person"]
        }
    }
}