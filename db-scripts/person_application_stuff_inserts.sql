--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1
\c
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
-- Data for Name: Person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Person" (id, first_name, last_name, username, password, failed_login_attempts, "createdAt", "updatedAt") VALUES (1, 'test', 'test', 'test', 'test444', 0, '2021-02-13 16:08:23.101+01', '2021-02-13 16:08:23.101+01');
INSERT INTO public."Person" (id, first_name, last_name, username, password, failed_login_attempts, "createdAt", "updatedAt") VALUES (5, 'test', 'test', 'teste', 'test444', 0, '2021-02-13 16:26:01.217+01', '2021-02-13 16:26:01.217+01');
INSERT INTO public."Person" (id, first_name, last_name, username, password, failed_login_attempts, "createdAt", "updatedAt") VALUES (6, 'rec', 'ruiter', 'recruiter', 'rec123', 0, '2021-03-03 23:47:59.223189+01', '2021-03-03 23:47:59.223189+01');
INSERT INTO public."Person" (id, first_name, last_name, username, password, failed_login_attempts, "createdAt", "updatedAt") VALUES (7, 'app', 'licant', 'applicant', 'app123', 0, '2021-03-03 23:47:59.223189+01', '2021-03-03 23:47:59.223189+01');


--
-- Data for Name: Applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Applicant" (person_id, email, ssn, "createdAt", "updatedAt") VALUES (1, 'test@mail.com', '860130-1111', '2021-02-13 16:08:23.11+01', '2021-02-13 16:08:23.11+01');
INSERT INTO public."Applicant" (person_id, email, ssn, "createdAt", "updatedAt") VALUES (5, 'test@mail.com', '880101-1221', '2021-02-13 16:26:01.228+01', '2021-02-13 16:26:01.228+01');
INSERT INTO public."Applicant" (person_id, email, ssn, "createdAt", "updatedAt") VALUES (7, 'applicant@mail.com', '900201-1332', '2021-03-03 23:49:38.43718+01', '2021-03-03 23:49:38.43718+01');


--
-- Data for Name: Application; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Application" (id, person_id, status_id, version, created_at, updated_at) VALUES (1, 1, 2, 1, '2021-03-03 23:53:47.265692+01', '2021-03-03 23:53:47.265692+01');
INSERT INTO public."Application" (id, person_id, status_id, version, created_at, updated_at) VALUES (2, 5, 2, 1, '2021-03-03 23:53:47.265692+01', '2021-03-03 23:53:47.265692+01');
INSERT INTO public."Application" (id, person_id, status_id, version, created_at, updated_at) VALUES (3, 7, 2, 1, '2021-03-03 23:53:47.265692+01', '2021-03-03 23:53:47.265692+01');


--
-- Data for Name: ApplicationCompetence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ApplicationCompetence" (application_id, competence_id, duration_id, created_at, updated_at) VALUES (1, 1, 4, '2021-03-03 23:57:15.055757+01', '2021-03-03 23:57:15.055757+01');
INSERT INTO public."ApplicationCompetence" (application_id, competence_id, duration_id, created_at, updated_at) VALUES (1, 2, 2, '2021-03-03 23:57:15.055757+01', '2021-03-03 23:57:15.055757+01');
INSERT INTO public."ApplicationCompetence" (application_id, competence_id, duration_id, created_at, updated_at) VALUES (2, 1, 6, '2021-03-03 23:57:15.055757+01', '2021-03-03 23:57:15.055757+01');
INSERT INTO public."ApplicationCompetence" (application_id, competence_id, duration_id, created_at, updated_at) VALUES (3, 1, 1, '2021-03-03 23:57:15.055757+01', '2021-03-03 23:57:15.055757+01');
INSERT INTO public."ApplicationCompetence" (application_id, competence_id, duration_id, created_at, updated_at) VALUES (3, 2, 5, '2021-03-03 23:57:15.055757+01', '2021-03-03 23:57:15.055757+01');


--
-- Data for Name: Availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Availability" (application_id, from_date, to_date, created_at, updated_at) VALUES (1, 1614729600, 1615766400, '2021-03-04 00:04:52.457736+01', '2021-03-04 00:04:52.457736+01');
INSERT INTO public."Availability" (application_id, from_date, to_date, created_at, updated_at) VALUES (2, 1614729600, 1618272000, '2021-03-04 00:04:52.457736+01', '2021-03-04 00:04:52.457736+01');
INSERT INTO public."Availability" (application_id, from_date, to_date, created_at, updated_at) VALUES (3, 1614729600, 1618272000, '2021-03-04 00:04:52.457736+01', '2021-03-04 00:04:52.457736+01');
INSERT INTO public."Availability" (application_id, from_date, to_date, created_at, updated_at) VALUES (3, 1618963200, 1621555200, '2021-03-04 00:04:52.457736+01', '2021-03-04 00:04:52.457736+01');


--
-- Data for Name: Recruiter; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Recruiter" (person_id, created_at, updated_at) VALUES (6, '2021-03-03 23:48:39.05045+01', '2021-03-03 23:48:39.05045+01');


--
-- Name: Application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Application_id_seq"', 6, true);


--
-- Name: Person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Person_id_seq"', 5, true);


--
-- PostgreSQL database dump complete
--

