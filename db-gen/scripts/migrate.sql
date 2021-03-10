\c recruit

insert into person (id, first_name, last_name, username, password) values (1, 'Greta', 'Borg', 'borg', 'wl9nk23a');
insert into person (id, first_name, last_name, username, password) values (2, 'Per', 'Strand', ' ', ' ');
insert into recruiter (person_id) values (1);
insert into applicant (person_id, email, ssn, dob) values (2, 'per@strand.kth.se', '19671212-1211', '');

insert into status (id, name) values (1, 'unhandled');
insert into status (id, name) values (2, 'accepted');
insert into status (id, name) values (3, 'rejected');
insert into competence (id, name) values (1, 'Korvgrillning');
insert into competence (id, name) values (2, 'Karuselldrift');
insert into duration (id, years) values (1, 0.5);
insert into duration (id, years) values (2, 1);
insert into duration (id, years) values (3, 1.5);
insert into duration (id, years) values (4, 2);
insert into duration (id, years) values (5, 2.5);
insert into duration (id, years) values (6, 3);
insert into duration (id, years) values (7, 3.5);
insert into duration (id, years) values (8, 4);
insert into duration (id, years) values (9, 4.5);
insert into duration (id, years) values (10, 5);

insert into application (id, person_id, status_id, version) values (1, 2, 1, 1);
insert into application_competence (application_id, competence_id, duration_id) values (1, 1, 7);
insert into application_competence (application_id, competence_id, duration_id) values (1, 2, 4);
insert into availability (application_id, from_date, to_date) values (1, 1393113600, 1400976000);
insert into availability (application_id, from_date, to_date) values (1, 1404950400, 1407628800);
