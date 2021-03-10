\c recruit_original

insert into role (role_id, name) values (1, 'recruit');
insert into role (role_id, name) values (2, 'applicant');

insert into person (person_id, name, surname, username, password, role_id)
    values (1, 'Greta', 'Borg', 'borg', 'wl9nk23a', 1);
insert into person (person_id, name, surname, ssn, email, role_id)
    values (2, 'Per', 'Strand', '19671212-1211', 'per@strand.kth.se', 2);

insert into availability (availability_id, person_id, from_date, to_date)
    values (1, 2, '2014-02-23', '2014-05-25');
insert into availability (availability_id, person_id, from_date, to_date)
    values (2, 2, '2014-07-10', '2014-08-10');

insert into competence (competence_id, name)
    values (1, 'Korvgrillning');
insert into competence (competence_id, name)
    values (2, 'Karuselldrift');

insert into competence_profile (competence_profile_id, person_id, competence_id, years_of_experience)
    values (1, 2, 1, 3.5);
insert into competence_profile (competence_profile_id, person_id, competence_id, years_of_experience)
    values (2, 2, 2, 2.0);