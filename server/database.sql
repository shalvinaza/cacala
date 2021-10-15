CREATE DATABASE db_cacala;

CREATE TABLE users(
   id uuid PRIMARY KEY DEFAULT
   uuid_generate_v4(),
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL
);

INSERT INTO users(username, email, password) VALUES ('boti', 'boti@cat.com', 'botiboti');