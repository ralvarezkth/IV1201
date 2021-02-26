\c recruit_original

create table role (
role_id serial primary key,
name text
);

create table person (
person_id serial primary key,
name text,
surname text,
ssn text,
email text,
password text,
role_id integer references role,
username text
);

create table availability (
availability_id serial primary key,
person_id integer references person,
from_date date,
to_date date
);

create table competence (
competence_id serial primary key,
name text
);

create table competence_profile (
competence_profile_id serial primary key,
person_id integer references person,
competence_id integer references competence,
years_of_experience numeric(4, 2)
);