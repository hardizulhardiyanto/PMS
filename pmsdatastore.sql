toc.dat                                                                                             0000600 0004000 0002000 00000033042 13552606440 0014446 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                       	    w            pmsdatastore "   10.10 (Ubuntu 10.10-1.pgdg18.04+1)     11.5 (Ubuntu 11.5-1.pgdg18.04+1) 0    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         �           1262    16741    pmsdatastore    DATABASE     ~   CREATE DATABASE pmsdatastore WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE pmsdatastore;
             postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false         �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3         �            1259    16743    activity    TABLE     �   CREATE TABLE public.activity (
    activityid integer NOT NULL,
    "time" timestamp without time zone NOT NULL,
    title character varying(25),
    description character varying(70),
    author integer
);
    DROP TABLE public.activity;
       public         postgres    false    3         �            1259    16746    activity_activityid_seq    SEQUENCE     �   CREATE SEQUENCE public.activity_activityid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.activity_activityid_seq;
       public       postgres    false    3    196         �           0    0    activity_activityid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.activity_activityid_seq OWNED BY public.activity.activityid;
            public       postgres    false    197         �            1259    16748    issues    TABLE     x  CREATE TABLE public.issues (
    issueid integer NOT NULL,
    projectid integer,
    tracker character varying(10),
    subject character varying(80),
    description character varying(50),
    status character varying(30),
    priority character varying(20),
    assignee integer,
    startdate date,
    duedate date,
    estimatedtime real,
    files text,
    spenttime numeric,
    targetversion character varying(20),
    author integer,
    createdtdate timestamp(4) without time zone,
    updatedate timestamp(4) without time zone,
    closeddate timestamp(4) without time zone,
    parenttask integer,
    done integer
);
    DROP TABLE public.issues;
       public         postgres    false    3         �            1259    16754    issues_issueid_seq    SEQUENCE     �   CREATE SEQUENCE public.issues_issueid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.issues_issueid_seq;
       public       postgres    false    3    198         �           0    0    issues_issueid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.issues_issueid_seq OWNED BY public.issues.issueid;
            public       postgres    false    199         �            1259    16756    members    TABLE     �   CREATE TABLE public.members (
    id integer NOT NULL,
    userid integer,
    projectid integer,
    roleid character varying(20)
);
    DROP TABLE public.members;
       public         postgres    false    3         �            1259    16759    members_id_seq    SEQUENCE     �   CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.members_id_seq;
       public       postgres    false    200    3         �           0    0    members_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;
            public       postgres    false    201         �            1259    16761    projects    TABLE     j   CREATE TABLE public.projects (
    projectid integer NOT NULL,
    name character varying(30) NOT NULL
);
    DROP TABLE public.projects;
       public         postgres    false    3         �            1259    16764    projects_projectid_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_projectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.projects_projectid_seq;
       public       postgres    false    202    3         �           0    0    projects_projectid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.projects_projectid_seq OWNED BY public.projects.projectid;
            public       postgres    false    203         �            1259    16766    users    TABLE     t  CREATE TABLE public.users (
    userid integer NOT NULL,
    email character varying(50) NOT NULL,
    firstname character varying(10),
    lastname character varying(10),
    roles character varying(30),
    password character varying(25) NOT NULL,
    optionproject text,
    work_status text DEFAULT 15,
    optionmember text,
    optionlist text,
    admin boolean
);
    DROP TABLE public.users;
       public         postgres    false    3         �            1259    16773    users_serial_seq    SEQUENCE     �   CREATE SEQUENCE public.users_serial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_serial_seq;
       public       postgres    false    3    204         �           0    0    users_serial_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_serial_seq OWNED BY public.users.userid;
            public       postgres    false    205         �
           2604    16775    activity activityid    DEFAULT     z   ALTER TABLE ONLY public.activity ALTER COLUMN activityid SET DEFAULT nextval('public.activity_activityid_seq'::regclass);
 B   ALTER TABLE public.activity ALTER COLUMN activityid DROP DEFAULT;
       public       postgres    false    197    196         �
           2604    16776    issues issueid    DEFAULT     p   ALTER TABLE ONLY public.issues ALTER COLUMN issueid SET DEFAULT nextval('public.issues_issueid_seq'::regclass);
 =   ALTER TABLE public.issues ALTER COLUMN issueid DROP DEFAULT;
       public       postgres    false    199    198         �
           2604    16777 
   members id    DEFAULT     h   ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);
 9   ALTER TABLE public.members ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200         �
           2604    16778    projects projectid    DEFAULT     x   ALTER TABLE ONLY public.projects ALTER COLUMN projectid SET DEFAULT nextval('public.projects_projectid_seq'::regclass);
 A   ALTER TABLE public.projects ALTER COLUMN projectid DROP DEFAULT;
       public       postgres    false    203    202                    2604    16779    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_serial_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public       postgres    false    205    204         �          0    16743    activity 
   TABLE DATA               R   COPY public.activity (activityid, "time", title, description, author) FROM stdin;
    public       postgres    false    196       2956.dat �          0    16748    issues 
   TABLE DATA               �   COPY public.issues (issueid, projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, files, spenttime, targetversion, author, createdtdate, updatedate, closeddate, parenttask, done) FROM stdin;
    public       postgres    false    198       2958.dat �          0    16756    members 
   TABLE DATA               @   COPY public.members (id, userid, projectid, roleid) FROM stdin;
    public       postgres    false    200       2960.dat �          0    16761    projects 
   TABLE DATA               3   COPY public.projects (projectid, name) FROM stdin;
    public       postgres    false    202       2962.dat �          0    16766    users 
   TABLE DATA               �   COPY public.users (userid, email, firstname, lastname, roles, password, optionproject, work_status, optionmember, optionlist, admin) FROM stdin;
    public       postgres    false    204       2964.dat �           0    0    activity_activityid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.activity_activityid_seq', 34, true);
            public       postgres    false    197         �           0    0    issues_issueid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.issues_issueid_seq', 69, true);
            public       postgres    false    199         �           0    0    members_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.members_id_seq', 115, true);
            public       postgres    false    201         �           0    0    projects_projectid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.projects_projectid_seq', 65, true);
            public       postgres    false    203         �           0    0    users_serial_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_serial_seq', 17, true);
            public       postgres    false    205                    2606    16781    activity activity_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (activityid);
 @   ALTER TABLE ONLY public.activity DROP CONSTRAINT activity_pkey;
       public         postgres    false    196                    2606    16783    issues issues_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issueid);
 <   ALTER TABLE ONLY public.issues DROP CONSTRAINT issues_pkey;
       public         postgres    false    198                    2606    16785    members members_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public         postgres    false    200         	           2606    16787    projects projects_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (projectid);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public         postgres    false    202                    2606    16789    users userid 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT userid PRIMARY KEY (userid);
 6   ALTER TABLE ONLY public.users DROP CONSTRAINT userid;
       public         postgres    false    204                    2606    16790    issues assignee    FK CONSTRAINT     s   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT assignee FOREIGN KEY (assignee) REFERENCES public.users(userid);
 9   ALTER TABLE ONLY public.issues DROP CONSTRAINT assignee;
       public       postgres    false    198    2827    204                    2606    16795    issues author    FK CONSTRAINT     o   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT author FOREIGN KEY (author) REFERENCES public.users(userid);
 7   ALTER TABLE ONLY public.issues DROP CONSTRAINT author;
       public       postgres    false    204    198    2827                    2606    16800    activity author    FK CONSTRAINT     q   ALTER TABLE ONLY public.activity
    ADD CONSTRAINT author FOREIGN KEY (author) REFERENCES public.users(userid);
 9   ALTER TABLE ONLY public.activity DROP CONSTRAINT author;
       public       postgres    false    204    196    2827                    2606    16805    issues parenttask    FK CONSTRAINT     y   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT parenttask FOREIGN KEY (parenttask) REFERENCES public.issues(issueid);
 ;   ALTER TABLE ONLY public.issues DROP CONSTRAINT parenttask;
       public       postgres    false    198    198    2821                    2606    16810    members projectid    FK CONSTRAINT     |   ALTER TABLE ONLY public.members
    ADD CONSTRAINT projectid FOREIGN KEY (projectid) REFERENCES public.projects(projectid);
 ;   ALTER TABLE ONLY public.members DROP CONSTRAINT projectid;
       public       postgres    false    202    2825    200                    2606    16815    issues projectid    FK CONSTRAINT     {   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT projectid FOREIGN KEY (projectid) REFERENCES public.projects(projectid);
 :   ALTER TABLE ONLY public.issues DROP CONSTRAINT projectid;
       public       postgres    false    202    198    2825                    2606    16820    members userid    FK CONSTRAINT     p   ALTER TABLE ONLY public.members
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.users(userid);
 8   ALTER TABLE ONLY public.members DROP CONSTRAINT userid;
       public       postgres    false    204    2827    200                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      2956.dat                                                                                            0000600 0004000 0002000 00000000104 13552606440 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        34	2019-10-19 08:02:50	Create Home'#65'New	Home as Created	101
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                            2958.dat                                                                                            0000600 0004000 0002000 00000000244 13552606440 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        69	65	Feature	Create Home	Home as Created	New	normal	16	2019-10-01	2019-10-02	2	schmaDB_universitas1571490170884.jpg	\N	\N	101	2019-10-19 08:02:50	\N	\N	\N	25
\.


                                                                                                                                                                                                                                                                                                                                                            2960.dat                                                                                            0000600 0004000 0002000 00000000064 13552606440 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        114	16	65	manager
115	17	65	software developer
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                            2962.dat                                                                                            0000600 0004000 0002000 00000000026 13552606440 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        65	hiring system
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          2964.dat                                                                                            0000600 0004000 0002000 00000002611 13552606440 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        101	admin@gmail.com	hardy	zulhardiya	Software Developer	040193	{"idcheckbox":"true","namecheckbox":"true","memberscheckbox":"true"}	fulltime	{"idckmembers":"true","nameckmembers":"true","postckmembers":"true"}	{"idckissue":"true","subjectckissue":"true","trackerckissue":"true","statusckissue":"true","priorityckissue":"true","descckissue":"true","stdateckissue":"true","duedateckissue":"true","estTimeckissue":"true","doneissue":"true","authorissue":"true","assigneeissue":"true"}	t
16	gami@gmail.com	Resti	Gami	manager	123	{"idcheckbox":"true","namecheckbox":"true","memberscheckbox":"true"}	fulltime	{"idckmembers":"true","nameckmembers":"true","postckmembers":"true"}	{"idckissue":"true","subjectckissue":"true","trackerckissue":"true","statusckissue":"true","priorityckissue":"true","descckissue":"true","stdateckissue":"true","duedateckissue":"true","estTimeckissue":"true","doneissue":"true","authorissue":"true","assigneeissue":"true"}	f
17	wawa@gmail.com	ramadhan	salwa	manager	123	{"idcheckbox":"true","namecheckbox":"true","memberscheckbox":"true"}	parttime	{"idckmembers":"true","nameckmembers":"true","postckmembers":"true"}	{"idckissue":"true","subjectckissue":"true","trackerckissue":"true","statusckissue":"true","priorityckissue":"true","descckissue":"true","stdateckissue":"true","duedateckissue":"true","estTimeckissue":"true","doneissue":"true","authorissue":"true","assigneeissue":"true"}	f
\.


                                                                                                                       restore.sql                                                                                         0000600 0004000 0002000 00000026711 13552606440 0015400 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-1.pgdg18.04+1)

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

DROP DATABASE pmsdatastore;
--
-- Name: pmsdatastore; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pmsdatastore WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE pmsdatastore OWNER TO postgres;

\connect pmsdatastore

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity (
    activityid integer NOT NULL,
    "time" timestamp without time zone NOT NULL,
    title character varying(25),
    description character varying(70),
    author integer
);


ALTER TABLE public.activity OWNER TO postgres;

--
-- Name: activity_activityid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_activityid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_activityid_seq OWNER TO postgres;

--
-- Name: activity_activityid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_activityid_seq OWNED BY public.activity.activityid;


--
-- Name: issues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.issues (
    issueid integer NOT NULL,
    projectid integer,
    tracker character varying(10),
    subject character varying(80),
    description character varying(50),
    status character varying(30),
    priority character varying(20),
    assignee integer,
    startdate date,
    duedate date,
    estimatedtime real,
    files text,
    spenttime numeric,
    targetversion character varying(20),
    author integer,
    createdtdate timestamp(4) without time zone,
    updatedate timestamp(4) without time zone,
    closeddate timestamp(4) without time zone,
    parenttask integer,
    done integer
);


ALTER TABLE public.issues OWNER TO postgres;

--
-- Name: issues_issueid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.issues_issueid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.issues_issueid_seq OWNER TO postgres;

--
-- Name: issues_issueid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.issues_issueid_seq OWNED BY public.issues.issueid;


--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id integer NOT NULL,
    userid integer,
    projectid integer,
    roleid character varying(20)
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.members_id_seq OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    projectid integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_projectid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_projectid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_projectid_seq OWNER TO postgres;

--
-- Name: projects_projectid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_projectid_seq OWNED BY public.projects.projectid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    email character varying(50) NOT NULL,
    firstname character varying(10),
    lastname character varying(10),
    roles character varying(30),
    password character varying(25) NOT NULL,
    optionproject text,
    work_status text DEFAULT 15,
    optionmember text,
    optionlist text,
    admin boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_serial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_serial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_serial_seq OWNER TO postgres;

--
-- Name: users_serial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_serial_seq OWNED BY public.users.userid;


--
-- Name: activity activityid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity ALTER COLUMN activityid SET DEFAULT nextval('public.activity_activityid_seq'::regclass);


--
-- Name: issues issueid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues ALTER COLUMN issueid SET DEFAULT nextval('public.issues_issueid_seq'::regclass);


--
-- Name: members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Name: projects projectid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN projectid SET DEFAULT nextval('public.projects_projectid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_serial_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity (activityid, "time", title, description, author) FROM stdin;
\.
COPY public.activity (activityid, "time", title, description, author) FROM '$$PATH$$/2956.dat';

--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.issues (issueid, projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, files, spenttime, targetversion, author, createdtdate, updatedate, closeddate, parenttask, done) FROM stdin;
\.
COPY public.issues (issueid, projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, files, spenttime, targetversion, author, createdtdate, updatedate, closeddate, parenttask, done) FROM '$$PATH$$/2958.dat';

--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, userid, projectid, roleid) FROM stdin;
\.
COPY public.members (id, userid, projectid, roleid) FROM '$$PATH$$/2960.dat';

--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (projectid, name) FROM stdin;
\.
COPY public.projects (projectid, name) FROM '$$PATH$$/2962.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, email, firstname, lastname, roles, password, optionproject, work_status, optionmember, optionlist, admin) FROM stdin;
\.
COPY public.users (userid, email, firstname, lastname, roles, password, optionproject, work_status, optionmember, optionlist, admin) FROM '$$PATH$$/2964.dat';

--
-- Name: activity_activityid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_activityid_seq', 34, true);


--
-- Name: issues_issueid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.issues_issueid_seq', 69, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 115, true);


--
-- Name: projects_projectid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_projectid_seq', 65, true);


--
-- Name: users_serial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_serial_seq', 17, true);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (activityid);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issueid);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (projectid);


--
-- Name: users userid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT userid PRIMARY KEY (userid);


--
-- Name: issues assignee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT assignee FOREIGN KEY (assignee) REFERENCES public.users(userid);


--
-- Name: issues author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT author FOREIGN KEY (author) REFERENCES public.users(userid);


--
-- Name: activity author; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT author FOREIGN KEY (author) REFERENCES public.users(userid);


--
-- Name: issues parenttask; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT parenttask FOREIGN KEY (parenttask) REFERENCES public.issues(issueid);


--
-- Name: members projectid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT projectid FOREIGN KEY (projectid) REFERENCES public.projects(projectid);


--
-- Name: issues projectid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT projectid FOREIGN KEY (projectid) REFERENCES public.projects(projectid);


--
-- Name: members userid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT userid FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       