\c recruit

delete from application where id in (select id from application);
delete from person where id in (select id from person);
delete from status where id in (select id from status);
delete from duration where id in (select id from duration);
delete from competence where id in (select id from competence);
delete from content where id in (select id from content);
delete from fragment where id in (select id from fragment);
