--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1
\c dbtest
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Content; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Content" (id, lang, created_at, updated_at) VALUES (1, 'english', '2021-02-27 22:59:51.797496+01', '2021-02-27 22:59:51.797496+01');
INSERT INTO public."Content" (id, lang, created_at, updated_at) VALUES (2, 'swedish', '2021-02-27 23:00:02.888311+01', '2021-02-27 23:00:02.888311+01');
INSERT INTO public."Content" (id, lang, created_at, updated_at) VALUES (3, 'german', '2021-02-27 23:00:06.957171+01', '2021-02-27 23:00:06.957171+01');


--
-- Data for Name: Fragment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (1, 'menuhome', '2021-02-27 23:02:48.92249+01', '2021-02-27 23:02:48.92249+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (2, 'menulogin', '2021-02-27 23:02:57.460896+01', '2021-02-27 23:02:57.460896+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (3, 'menuregister', '2021-02-27 23:03:06.386306+01', '2021-02-27 23:03:06.386306+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (4, 'menuapply', '2021-02-27 23:03:14.941499+01', '2021-02-27 23:03:14.941499+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (5, 'footercontent', '2021-03-01 09:33:27.516042+01', '2021-03-01 09:33:27.516042+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (6, 'hometitle', '2021-03-01 09:33:46.231203+01', '2021-03-01 09:33:46.231203+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (7, 'homecontent', '2021-03-01 09:33:57.48287+01', '2021-03-01 09:33:57.48287+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (8, 'registertitle', '2021-03-01 09:34:21.368853+01', '2021-03-01 09:34:21.368853+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (9, 'registerbutton', '2021-03-01 09:34:46.25886+01', '2021-03-01 09:34:46.25886+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (10, 'logintitle', '2021-03-01 09:35:05.606849+01', '2021-03-01 09:35:05.606849+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (11, 'loginbutton', '2021-03-01 09:35:12.729276+01', '2021-03-01 09:35:12.729276+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (12, 'applytitle', '2021-03-01 09:35:27.856631+01', '2021-03-01 09:35:27.856631+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (13, 'applybutton', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (14, 'adminbutton', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (15, 'admintitle', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (16, 'admintimemetric', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (17, 'adminavailability', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (18, 'adminchooseapp', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (19, 'adminchoosestatus', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (20, 'menulanguage', '2021-02-27 23:03:14.941499+01', '2021-02-27 23:03:14.941499+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (21, 'registerfirstname', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (22, 'registerlastname', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (23, 'registeremail', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (24, 'registerusername', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');
INSERT INTO public."Fragment" (id, name, created_at, updated_at) VALUES (25, 'registerpassword', '2021-03-01 09:35:35.095728+01', '2021-03-01 09:35:35.095728+01');


--
-- Data for Name: ContentFragment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 1, 'Home', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 2, 'Login', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 3, 'Register', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 4, 'Apply', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 1, 'Hem', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 2, 'Logga in', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 3, 'Registrering', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 4, 'Ansök', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 1, 'Zuhause', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 2, 'Anmeldung', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 3, 'Registrieren', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 4, 'Anwenden', '2021-02-27 23:10:29.836388+01', '2021-02-27 23:10:29.836388+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 5, 'Footer all rights reserved', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 6, 'Welcome to the recruitment application!', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 8, 'Registration', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 9, 'Submit Registration', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 10, 'Login', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 11, 'Log in', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 12, 'Apply for a position', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 13, 'Get application form', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 5, 'Svettiga fötter välkommen att ta för er', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 6, 'Välkommen till rekryteringsapplikationen!', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 8, 'Registrering', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 9, 'Skicka Registrering', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 10, 'Logga in', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 11, 'Logga in', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 12, 'Ansök om en position', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 13, 'Hämta ansökningsform', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 6, 'Willkommen bei der Bewerbung programm!', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 8, 'Registrieren', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 9, 'Einreichen Registrieren', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 10, 'Anmeldung', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 11, 'Einloggen', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 12, 'Eine Stelle beantragen', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 13, 'Bewerbungsformular erhalten', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 7, 'This client is still very much a work in progress, so bear with us. There is still cause for celebration today no matter how things go. Get access to the apply page to find out! :)', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 7, 'Den här klienten är fortfarande ett bananskal, så håll avstånd. Oavsett hur saker går idag så finns det fortfarande skäl att fira för våren är kommen. Få tillgång till ansökningssidan och bli en professionell korvgrillare idag! :)', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 7, 'Achtung, unser deutsch ist ein bisschen besser als dieses programm. Unabhängig davon, wie die Dinge heute laufen, gibt es immer noch Grund zum Feiern, denn Richard ist ein spassig Dussel. Das muss man sagen. Greifen Sie auf die Anwendungsseite zu und überzeugen Sie sich selbst! :)', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 5, 'Kartoffelsalat ist sehr gut', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 14, 'Update application', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 14, 'Uppdatera ansökan', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 14, 'Anwendung aktualisieren', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 15, 'Admin', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 15, 'Admin', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 15, 'Admin', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 16, 'years', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 16, 'år', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 16, 'Jahre', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 17, 'Availability periods', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 17, 'Tillgänglighetsperioder', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 17, 'Zeit perioden', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 18, 'Choose application', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 18, 'Välj ansökan', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 18, 'Zooser Anmeldung', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 19, 'Choose status', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 19, 'Välj status', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 19, 'Zoooser status', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 20, 'Language', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 20, 'Språk', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 20, 'Sprache', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 21, 'First name', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 21, 'Förnamn', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 21, 'Ein name', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 22, 'Last name', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 22, 'Efternamn', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 22, 'Leste name', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 23, 'Email address', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 23, 'Email adress', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 23, 'Email adresse', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 24, 'Username', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 24, 'Användarnamn', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 24, 'User name', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (1, 25, 'Password', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (2, 25, 'Lösenord', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');
INSERT INTO public."ContentFragment" (content_id, fragment_id, value, created_at, updated_at) VALUES (3, 25, 'Passwort', '2021-03-01 10:42:19.990288+01', '2021-03-01 10:42:19.990288+01');


--
-- Name: Content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Content_id_seq"', 3, true);


--
-- Name: Fragment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Fragment_id_seq"', 4, true);


--
-- PostgreSQL database dump complete
--

