-- TABEL USER
CREATE DATABASE db_cacala;

CREATE TABLE users(
   id uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL
);

INSERT INTO users(username, email, password) VALUES ('boti', 'boti@cat.com', 'botiboti');

--TABEL KOTA
CREATE TABLE Kota(
   id_kota uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   id_provinsi uuid NOT NULL,
   kota VARCHAR(50) NOT NULL,
   CONSTRAINT fk_provinsi
      FOREIGN KEY(id_provinsi) 
	      REFERENCES provinsi(id_provinsi)
);

INSERT INTO Kota(id_provinsi, kota) VALUES(
   '128254fc-fd93-4025-bc23-e784f64907ee',
   'Kota Gorontalo'
);

-- SELECT KOTA + PROVINSI
select kota.id_kota, kota.kota, provinsi.provinsi
   FROM kota, provinsi
         WHERE kota.id_provinsi = provinsi.id_provinsi;

--TABEL CALON
CREATE TABLE Calon(
   id_calon uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   id_admin uuid REFERENCES admins(id_admin),
   id_jabatan uuid REFERENCES jabatan(id_jabatan),
   id_dapil_kota uuid REFERENCES kota(id_kota),
   nama VARCHAR(255) NOT NULL,
   foto TEXT,
   slogan VARCHAR(255)
);

INSERT INTO Calon(
      id_admin, 
      id_jabatan,
      id_dapil_kota,
      nama,
      foto,
      slogan
   ) 
   VALUES(
      '6bf8043e-1015-435a-89e0-a753427ba45a', 
      '399f8983-3983-43b0-b095-55d62cebc309',
      '07058482-f4ef-46fa-8005-219181f0e64c',
      'Aithra Junia Bouty',
      'https://i.pinimg.com/474x/40/f3/1d/40f31dd88a4ec213f8b21d1444242969.jpg',
      'Yuk Bisa Yuk'
   );

select calon.id_calon, calon.nama, calon.foto, calon.slogan, admins.username, jabatan.jabatan_tujuan, kota.kota, provinsi.provinsi
   FROM calon
      JOIN admins on calon.id_admin = admins.id_admin
      JOIN jabatan on calon.id_jabatan = jabatan.id_jabatan
      JOIN kota on calon.id_dapil_kota = kota.id_kota
      JOIN provinsi on kota.id_provinsi = provinsi.id_provinsi
;
