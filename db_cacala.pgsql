--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id_admin uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: calon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calon (
    id_calon uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_admin uuid,
    id_jabatan uuid,
    id_dapil_kota uuid,
    nama character varying(255) NOT NULL,
    foto text,
    slogan character varying(255)
);


ALTER TABLE public.calon OWNER TO postgres;

--
-- Name: jabatan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jabatan (
    id_jabatan uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    jabatan_tujuan character varying(255) NOT NULL
);


ALTER TABLE public.jabatan OWNER TO postgres;

--
-- Name: kota; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kota (
    id_kota uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_provinsi uuid NOT NULL,
    kota character varying(50) NOT NULL
);


ALTER TABLE public.kota OWNER TO postgres;

--
-- Name: mengikuti_calon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mengikuti_calon (
    id_user uuid NOT NULL,
    id_calon uuid NOT NULL
);


ALTER TABLE public.mengikuti_calon OWNER TO postgres;

--
-- Name: partai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partai (
    id_partai uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nama_partai character varying(100) NOT NULL
);


ALTER TABLE public.partai OWNER TO postgres;

--
-- Name: partai_calon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partai_calon (
    id_calon uuid NOT NULL,
    id_partai uuid NOT NULL
);


ALTER TABLE public.partai_calon OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id_post uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_admin uuid,
    judul character varying(100),
    teks text,
    foto text,
    video text,
    waktu timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: provinsi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinsi (
    id_provinsi uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    provinsi character varying(50) NOT NULL
);


ALTER TABLE public.provinsi OWNER TO postgres;

--
-- Name: riwayat_pekerjaan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pekerjaan (
    id_pekerjaan uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_calon uuid,
    nama_pekerjaan character varying(255) NOT NULL,
    detail_pekerjaan text,
    tahun_mulai_pekerjaan character varying(4),
    tahun_selesai_pekerjaan character varying(4)
);


ALTER TABLE public.riwayat_pekerjaan OWNER TO postgres;

--
-- Name: riwayat_pendidikan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pendidikan (
    id_pendidikan uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_calon uuid,
    nama_institusi character varying(255) NOT NULL,
    detail_pendidikan text,
    tahun_mulai_pendidikan character varying(4),
    tahun_selesai_pendidikan character varying(4)
);


ALTER TABLE public.riwayat_pendidikan OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id_admin, username, password) FROM stdin;
c45b83d7-667c-4e82-8033-ecc421b18919	admin1	$2b$10$skpqhUi2/hPDIlEMzIyOCOC2/UstMWXP5X2dGmGj/bMpm.UIQHs4C
d2647461-20fd-4520-bda3-47077b46a31e	admin2	$2b$10$OaC/qH75CkHetxy1qMjhD.OpmvUzBBWmsn0GV3uhG6j.BU0TbSGkO
7f5135e1-afb6-421c-9b29-11dea6c0b729	admin3	$2b$10$1EcaXvPns.TIq7eyearWPOXAAdYcir3yJbYK4lGSNwSy4k0kjb85m
\.


--
-- Data for Name: calon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calon (id_calon, id_admin, id_jabatan, id_dapil_kota, nama, foto, slogan) FROM stdin;
32555aee-f2a8-4cf3-924f-cfe888d659ae	c45b83d7-667c-4e82-8033-ecc421b18919	aa0faabb-82e5-45bc-8b0a-c5795aa4c91a	2b4af532-dfe7-4aef-8734-aeec7611e30b	Aithra Junia Bouty	https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg	Yuk Bisa Yuk
5e1788f2-9912-417b-abd5-78b67b358cf5	d2647461-20fd-4520-bda3-47077b46a31e	51978294-1f8a-4c8c-acbf-f3cc013c16d3	2b4af532-dfe7-4aef-8734-aeec7611e30b	Shalvina Aulia	https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg	Slogan Shalvina
57fe18c8-90da-44ab-bb80-193ad31baff2	7f5135e1-afb6-421c-9b29-11dea6c0b729	4afc1348-c4a3-4c3c-a355-dcd938614b13	2b4af532-dfe7-4aef-8734-aeec7611e30b	PRES	https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg	Aku calon presiden
5f6b9387-1714-4ae6-9124-26b01b0b4666	7f5135e1-afb6-421c-9b29-11dea6c0b729	7ab14b00-559b-4a3a-b307-80a78cff4b22	2b4af532-dfe7-4aef-8734-aeec7611e30b	WAPRES	https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg	Aku calon wakil presiden
\.


--
-- Data for Name: jabatan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jabatan (id_jabatan, jabatan_tujuan) FROM stdin;
ab55ff16-0673-4c8b-a572-bf282f75d9cf	DPR RI
51978294-1f8a-4c8c-acbf-f3cc013c16d3	DPD RI
aa0faabb-82e5-45bc-8b0a-c5795aa4c91a	DPRD Provinsi
1267363f-491f-4b70-aecc-3ef02b4c32ee	DPRD Kota
4afc1348-c4a3-4c3c-a355-dcd938614b13	Presiden
7ab14b00-559b-4a3a-b307-80a78cff4b22	Wakil Presiden
\.


--
-- Data for Name: kota; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kota (id_kota, id_provinsi, kota) FROM stdin;
2b4af532-dfe7-4aef-8734-aeec7611e30b	9f709293-5ddd-4e12-a56f-894e0962f472	Kota Gorontalo
\.


--
-- Data for Name: mengikuti_calon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mengikuti_calon (id_user, id_calon) FROM stdin;
862c6d34-c90c-40ff-8015-789044dd1697	32555aee-f2a8-4cf3-924f-cfe888d659ae
862c6d34-c90c-40ff-8015-789044dd1697	5e1788f2-9912-417b-abd5-78b67b358cf5
\.


--
-- Data for Name: partai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partai (id_partai, nama_partai) FROM stdin;
75f09646-c4c1-46ac-9261-11f468aabdb4	Partai Uhuy
e41f08af-27c4-4016-8766-ca45ed26edff	Partai Mantap
\.


--
-- Data for Name: partai_calon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partai_calon (id_calon, id_partai) FROM stdin;
32555aee-f2a8-4cf3-924f-cfe888d659ae	75f09646-c4c1-46ac-9261-11f468aabdb4
32555aee-f2a8-4cf3-924f-cfe888d659ae	e41f08af-27c4-4016-8766-ca45ed26edff
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (id_post, id_admin, judul, teks, foto, video, waktu) FROM stdin;
c3043de3-6aab-4643-99e6-0838f9c61cfc	c45b83d7-667c-4e82-8033-ecc421b18919	JUDUL POST 1			https://youtu.be/SlzVmD46HcI	2021-11-04 15:27:29.557128+07
bbdba3ea-cb91-4d65-88e2-75159b8f7da5	d2647461-20fd-4520-bda3-47077b46a31e	JUDUL POST 2	post 2 dikirim menggunakan token admin		https://youtu.be/SlzVmD46HcI	2021-11-10 09:05:09.449592+07
\.


--
-- Data for Name: provinsi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.provinsi (id_provinsi, provinsi) FROM stdin;
9f709293-5ddd-4e12-a56f-894e0962f472	Gorontalo
4c9fa501-1fda-4a7d-bcef-2da23100e185	Jawa Barat
dc0e4bf6-d4e0-4b1e-97db-20d9cf98e757	Kalimantan Timur
\.


--
-- Data for Name: riwayat_pekerjaan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pekerjaan (id_pekerjaan, id_calon, nama_pekerjaan, detail_pekerjaan, tahun_mulai_pekerjaan, tahun_selesai_pekerjaan) FROM stdin;
4fecb03f-c9be-401c-bf17-88a21c36b1e5	32555aee-f2a8-4cf3-924f-cfe888d659ae	Mobile Developer	Magang di BNI	2021	2022
7d0a08c8-1bbd-4e1d-8a7d-09d249b21b98	5e1788f2-9912-417b-abd5-78b67b358cf5	Programmer	Programmer handal	2020	2021
c54a1ca3-fef6-4090-8d4b-cdff9a3c6022	57fe18c8-90da-44ab-bb80-193ad31baff2	Programmer	Programmer handal	2020	2021
45424eb1-2893-4da2-8530-284a59109a46	5f6b9387-1714-4ae6-9124-26b01b0b4666	Pengamat Politik		2020	2021
\.


--
-- Data for Name: riwayat_pendidikan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pendidikan (id_pendidikan, id_calon, nama_institusi, detail_pendidikan, tahun_mulai_pendidikan, tahun_selesai_pendidikan) FROM stdin;
c704aff4-0d9d-42ed-a7a3-2ed4e812b4a9	32555aee-f2a8-4cf3-924f-cfe888d659ae	Universitas Padjadjaran	FMIPA Teknik Informatika	2018	2022
9570f698-dbd2-4706-9127-9245b4a2ff38	5e1788f2-9912-417b-abd5-78b67b358cf5	Universitas Padjadjaran	FMIPA Teknik Informatika	2018	2022
3b714d05-879a-4625-b0e8-fc4ab1cdc0f3	57fe18c8-90da-44ab-bb80-193ad31baff2	Universitas	Fakultas Hukum	2018	2022
458406d5-8b19-4145-a3c5-6729e65c5884	5f6b9387-1714-4ae6-9124-26b01b0b4666	Universitas	Fakultas Ilmu Politik	2018	2022
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, username, email, password) FROM stdin;
862c6d34-c90c-40ff-8015-789044dd1697	miyuu	miyu@mail.com	$2b$10$8hbfd00QI8tFIvvet9erq.6XqGD6u/hsPBvRipuByZqYuqsPso3uW
\.


--
-- Name: admins admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id_admin);


--
-- Name: calon calon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calon
    ADD CONSTRAINT calon_pkey PRIMARY KEY (id_calon);


--
-- Name: jabatan jabatan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jabatan
    ADD CONSTRAINT jabatan_pkey PRIMARY KEY (id_jabatan);


--
-- Name: kota kota_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kota
    ADD CONSTRAINT kota_pkey PRIMARY KEY (id_kota);


--
-- Name: mengikuti_calon mengikuti_calon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mengikuti_calon
    ADD CONSTRAINT mengikuti_calon_pkey PRIMARY KEY (id_user, id_calon);


--
-- Name: partai_calon partai_calon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partai_calon
    ADD CONSTRAINT partai_calon_pkey PRIMARY KEY (id_calon, id_partai);


--
-- Name: partai partai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partai
    ADD CONSTRAINT partai_pkey PRIMARY KEY (id_partai);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- Name: provinsi provinsi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinsi
    ADD CONSTRAINT provinsi_pkey PRIMARY KEY (id_provinsi);


--
-- Name: riwayat_pekerjaan riwayat_pekerjaan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pekerjaan
    ADD CONSTRAINT riwayat_pekerjaan_pkey PRIMARY KEY (id_pekerjaan);


--
-- Name: riwayat_pendidikan riwayat_pendidikan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pendidikan
    ADD CONSTRAINT riwayat_pendidikan_pkey PRIMARY KEY (id_pendidikan);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: calon calon_id_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calon
    ADD CONSTRAINT calon_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admins(id_admin);


--
-- Name: calon calon_id_dapil_kota_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calon
    ADD CONSTRAINT calon_id_dapil_kota_fkey FOREIGN KEY (id_dapil_kota) REFERENCES public.kota(id_kota);


--
-- Name: calon calon_id_jabatan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calon
    ADD CONSTRAINT calon_id_jabatan_fkey FOREIGN KEY (id_jabatan) REFERENCES public.jabatan(id_jabatan);


--
-- Name: kota fk_provinsi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kota
    ADD CONSTRAINT fk_provinsi FOREIGN KEY (id_provinsi) REFERENCES public.provinsi(id_provinsi);


--
-- Name: mengikuti_calon mengikuti_calon_id_calon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mengikuti_calon
    ADD CONSTRAINT mengikuti_calon_id_calon_fkey FOREIGN KEY (id_calon) REFERENCES public.calon(id_calon) ON UPDATE CASCADE;


--
-- Name: mengikuti_calon mengikuti_calon_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mengikuti_calon
    ADD CONSTRAINT mengikuti_calon_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: partai_calon partai_calon_id_calon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partai_calon
    ADD CONSTRAINT partai_calon_id_calon_fkey FOREIGN KEY (id_calon) REFERENCES public.calon(id_calon) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: partai_calon partai_calon_id_partai_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partai_calon
    ADD CONSTRAINT partai_calon_id_partai_fkey FOREIGN KEY (id_partai) REFERENCES public.partai(id_partai) ON UPDATE CASCADE;


--
-- Name: post post_id_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admins(id_admin);


--
-- Name: riwayat_pekerjaan riwayat_pekerjaan_id_calon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pekerjaan
    ADD CONSTRAINT riwayat_pekerjaan_id_calon_fkey FOREIGN KEY (id_calon) REFERENCES public.calon(id_calon);


--
-- Name: riwayat_pendidikan riwayat_pendidikan_id_calon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pendidikan
    ADD CONSTRAINT riwayat_pendidikan_id_calon_fkey FOREIGN KEY (id_calon) REFERENCES public.calon(id_calon);


--
-- PostgreSQL database dump complete
--

