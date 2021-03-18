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
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (1, 'Technical issues, please try again later.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (2, 'Tekniska problem, var vänlig försök senare.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (3, 'Technische Probleme, versuchen Sie es später erneut.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (4, 'Version mismatch.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (5, 'Versionskalabalik.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (6, 'Versionskonflikt.', '2021-03-15 20:48:46.571681+01', '2021-03-15 20:48:46.571681+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (7, 'This feature has not been implemented yet.', '2021-03-15 23:31:18.223043+01', '2021-03-15 23:31:18.223043+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (8, 'Denna funktion har inte blivit implementerad än.', '2021-03-15 23:31:18.223043+01', '2021-03-15 23:31:18.223043+01');
INSERT INTO public."Message" (id, content, created_at, updated_at) VALUES (9, 'Diese Funktion wurde noch nicht implementiert.', '2021-03-15 23:31:18.223043+01', '2021-03-15 23:31:18.223043+01');


--
-- Data for Name: Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (1, 'DatabaseAuthSyncError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (2, 'GetApplicationFailedError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (3, 'GetApplicationsFailedError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (4, 'UpdateApplicationFailedError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (5, 'GetLanguagesFailedError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (6, 'GetContentFailedError', '2021-03-15 20:48:56.011691+01', '2021-03-15 20:48:56.011691+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (7, 'VersionMismatchError', '2021-03-15 21:29:17.187593+01', '2021-03-15 21:29:17.187593+01');
INSERT INTO public."Type" (id, name, created_at, updated_at) VALUES (8, 'FeatureNotImplementedError', '2021-03-15 23:29:02.351667+01', '2021-03-15 23:29:02.351667+01');


--
-- Data for Name: ErrorFeedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (1, 1, 1, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (2, 2, 1, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (3, 3, 1, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (4, 1, 2, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (5, 2, 2, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (6, 3, 2, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (7, 1, 3, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (8, 2, 3, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (9, 3, 3, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (10, 1, 4, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (11, 2, 4, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (12, 3, 4, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (13, 1, 5, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (14, 2, 5, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (15, 3, 5, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (16, 1, 6, 1, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (17, 2, 6, 2, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (18, 3, 6, 3, '2021-03-15 20:59:04.199838+01', '2021-03-15 20:59:04.199838+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (19, 1, 7, 4, '2021-03-15 21:32:18.675646+01', '2021-03-15 21:32:18.675646+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (20, 2, 7, 5, '2021-03-15 21:32:18.675646+01', '2021-03-15 21:32:18.675646+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (21, 3, 7, 6, '2021-03-15 21:32:18.675646+01', '2021-03-15 21:32:18.675646+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (22, 1, 8, 7, '2021-03-15 23:32:32.492269+01', '2021-03-15 23:32:32.492269+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (23, 2, 8, 8, '2021-03-15 23:32:32.492269+01', '2021-03-15 23:32:32.492269+01');
INSERT INTO public."ErrorFeedback" (id, lang_id, type_id, message_id, created_at, updated_at) VALUES (24, 3, 8, 9, '2021-03-15 23:32:32.492269+01', '2021-03-15 23:32:32.492269+01');


--
-- Name: ErrorFeedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ErrorFeedback_id_seq"', 1, false);


--
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 1, false);


--
-- Name: Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Type_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

