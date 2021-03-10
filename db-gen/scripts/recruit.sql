--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1
\c recruit

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applicant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applicant (
    person_id integer NOT NULL,
    email text NOT NULL,
    ssn text NOT NULL
);


ALTER TABLE public.applicant OWNER TO postgres;

--
-- Name: applicant_person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.applicant_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applicant_person_id_seq OWNER TO postgres;

--
-- Name: applicant_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.applicant_person_id_seq OWNED BY public.applicant.person_id;


--
-- Name: application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application (
    id integer NOT NULL,
    person_id integer NOT NULL,
    status_id integer NOT NULL,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.application OWNER TO postgres;

--
-- Name: application_competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application_competence (
    application_id integer NOT NULL,
    competence_id integer NOT NULL,
    duration_id integer
);


ALTER TABLE public.application_competence OWNER TO postgres;

--
-- Name: application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_id_seq OWNER TO postgres;

--
-- Name: application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.application_id_seq OWNED BY public.application.id;


--
-- Name: availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability (
    application_id integer NOT NULL,
    from_date bigint NOT NULL,
    to_date bigint
);


ALTER TABLE public.availability OWNER TO postgres;

--
-- Name: competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competence (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.competence OWNER TO postgres;

--
-- Name: competence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.competence_id_seq OWNER TO postgres;

--
-- Name: competence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competence_id_seq OWNED BY public.competence.id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id integer NOT NULL,
    lang text NOT NULL
);


ALTER TABLE public.content OWNER TO postgres;

--
-- Name: content_fragment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_fragment (
    content_id integer NOT NULL,
    fragment_id integer NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.content_fragment OWNER TO postgres;

--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.content_id_seq OWNER TO postgres;

--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- Name: duration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.duration (
    id integer NOT NULL,
    years numeric(3,1) NOT NULL
);


ALTER TABLE public.duration OWNER TO postgres;

--
-- Name: duration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.duration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.duration_id_seq OWNER TO postgres;

--
-- Name: duration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.duration_id_seq OWNED BY public.duration.id;


--
-- Name: fragment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fragment (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.fragment OWNER TO postgres;

--
-- Name: fragment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fragment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fragment_id_seq OWNER TO postgres;

--
-- Name: fragment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fragment_id_seq OWNED BY public.fragment.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: recruiter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recruiter (
    person_id integer NOT NULL
);


ALTER TABLE public.recruiter OWNER TO postgres;

--
-- Name: recruiter_person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recruiter_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recruiter_person_id_seq OWNER TO postgres;

--
-- Name: recruiter_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recruiter_person_id_seq OWNED BY public.recruiter.person_id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- Name: applicant person_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant ALTER COLUMN person_id SET DEFAULT nextval('public.applicant_person_id_seq'::regclass);


--
-- Name: application id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application ALTER COLUMN id SET DEFAULT nextval('public.application_id_seq'::regclass);


--
-- Name: competence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence ALTER COLUMN id SET DEFAULT nextval('public.competence_id_seq'::regclass);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- Name: duration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duration ALTER COLUMN id SET DEFAULT nextval('public.duration_id_seq'::regclass);


--
-- Name: fragment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fragment ALTER COLUMN id SET DEFAULT nextval('public.fragment_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Name: recruiter person_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recruiter ALTER COLUMN person_id SET DEFAULT nextval('public.recruiter_person_id_seq'::regclass);


--
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- Data for Name: applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applicant (person_id, email, ssn) FROM stdin;
\.


--
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application (id, person_id, status_id, version) FROM stdin;
\.


--
-- Data for Name: application_competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application_competence (application_id, competence_id, duration_id) FROM stdin;
\.


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.availability (application_id, from_date, to_date) FROM stdin;
\.


--
-- Data for Name: competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competence (id, name) FROM stdin;
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, lang) FROM stdin;
\.


--
-- Data for Name: content_fragment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_fragment (content_id, fragment_id, value) FROM stdin;
\.


--
-- Data for Name: duration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.duration (id, years) FROM stdin;
\.


--
-- Data for Name: fragment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fragment (id, name) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (id, first_name, last_name, username, password) FROM stdin;
\.


--
-- Data for Name: recruiter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recruiter (person_id) FROM stdin;
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, name) FROM stdin;
\.


--
-- Name: applicant_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.applicant_person_id_seq', 1, false);


--
-- Name: application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.application_id_seq', 1, false);


--
-- Name: competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competence_id_seq', 1, false);


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_id_seq', 1, false);


--
-- Name: duration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.duration_id_seq', 1, false);


--
-- Name: fragment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fragment_id_seq', 1, false);


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 1, false);


--
-- Name: recruiter_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recruiter_person_id_seq', 1, false);


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 1, false);


--
-- Name: applicant applicant_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT applicant_email_key UNIQUE (email);


--
-- Name: applicant applicant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT applicant_pkey PRIMARY KEY (person_id);


--
-- Name: applicant applicant_ssn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT applicant_ssn_key UNIQUE (ssn);


--
-- Name: application_competence application_competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_competence
    ADD CONSTRAINT application_competence_pkey PRIMARY KEY (application_id, competence_id);


--
-- Name: application application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_pkey PRIMARY KEY (id);


--
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (application_id, from_date);


--
-- Name: competence competence_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT competence_name_key UNIQUE (name);


--
-- Name: competence competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competence
    ADD CONSTRAINT competence_pkey PRIMARY KEY (id);


--
-- Name: content_fragment content_fragment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_fragment
    ADD CONSTRAINT content_fragment_pkey PRIMARY KEY (content_id, fragment_id);


--
-- Name: content content_lang_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_lang_key UNIQUE (lang);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: duration duration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duration
    ADD CONSTRAINT duration_pkey PRIMARY KEY (id);


--
-- Name: duration duration_years_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duration
    ADD CONSTRAINT duration_years_key UNIQUE (years);


--
-- Name: fragment fragment_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fragment
    ADD CONSTRAINT fragment_name_key UNIQUE (name);


--
-- Name: fragment fragment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fragment
    ADD CONSTRAINT fragment_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: person person_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_username_key UNIQUE (username);


--
-- Name: recruiter recruiter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_pkey PRIMARY KEY (person_id);


--
-- Name: status status_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_name_key UNIQUE (name);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: applicant applicant_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT applicant_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_competence application_competence_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_competence
    ADD CONSTRAINT application_competence_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.application(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_competence application_competence_competence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_competence
    ADD CONSTRAINT application_competence_competence_id_fkey FOREIGN KEY (competence_id) REFERENCES public.competence(id) ON UPDATE CASCADE;


--
-- Name: application_competence application_competence_duration_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_competence
    ADD CONSTRAINT application_competence_duration_id_fkey FOREIGN KEY (duration_id) REFERENCES public.duration(id) ON UPDATE CASCADE;


--
-- Name: application application_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.applicant(person_id) ON UPDATE CASCADE;


--
-- Name: application application_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(id) ON UPDATE CASCADE;


--
-- Name: availability availability_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.application(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: content_fragment content_fragment_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_fragment
    ADD CONSTRAINT content_fragment_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: content_fragment content_fragment_fragment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_fragment
    ADD CONSTRAINT content_fragment_fragment_id_fkey FOREIGN KEY (fragment_id) REFERENCES public.fragment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: recruiter recruiter_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

