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
-- Data for Name: Competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Competence" (id, name, created_at, updated_at) VALUES (1, 'Korvgrillning', '2021-03-03 19:52:08.300021+01', '2021-03-03 19:52:08.300021+01');
INSERT INTO public."Competence" (id, name, created_at, updated_at) VALUES (2, 'Karuselldrift', '2021-03-03 19:52:08.300021+01', '2021-03-03 19:52:08.300021+01');


--
-- Data for Name: Duration; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (1, 0.5, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (2, 1.0, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (3, 1.5, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (4, 2.0, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (5, 2.5, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (6, 3.0, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (7, 3.5, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (8, 4.0, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (9, 4.5, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');
INSERT INTO public."Duration" (id, years, created_at, updated_at) VALUES (10, 5.0, '2021-03-03 19:51:58.936865+01', '2021-03-03 19:51:58.936865+01');


--
-- Data for Name: Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Status" (id, name, created_at, updated_at) VALUES (1, 'Unhandled', '2021-03-03 19:51:36.243273+01', '2021-03-03 19:51:36.243273+01');
INSERT INTO public."Status" (id, name, created_at, updated_at) VALUES (2, 'Accepted', '2021-03-03 19:51:36.243273+01', '2021-03-03 19:51:36.243273+01');
INSERT INTO public."Status" (id, name, created_at, updated_at) VALUES (3, 'Rejected', '2021-03-03 19:51:36.243273+01', '2021-03-03 19:51:36.243273+01');


--
-- Name: Competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Competence_id_seq"', 2, true);


--
-- Name: Duration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Duration_id_seq"', 10, true);


--
-- Name: Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Status_id_seq"', 4, true);


--
-- PostgreSQL database dump complete
--

