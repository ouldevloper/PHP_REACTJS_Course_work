
create database course;
use course;


create table user(
  id int primary key AUTO_INCREMENT,
  fullname varchar(50) not null,
  role varchar(10) not null,
  password varchar(255) not null ,
  email varchar(26) not null,
  last_access varchar(20) not null,
  boss int default NULL,
  private_key varchar(255) default NULL,
  public_key varchar(255) default NULL,
  joined_at varchar(20) not null
);

create table auth(
  id int primary key AUTO_INCREMENT,
  user_id int not null,
  token varchar(255) unique
);

create table files(
  id int primary key AUTO_INCREMENT,
  name varchar(50) not null,
  path varchar(255) NOT NULL,
  signature_directure varchar(255) NOT NULL,
  signature_head varchar(255) NOT NULL,
  hash varchar(255) NOT NULL
);

create table instruction(
  id int primary key AUTO_INCREMENT,
  subject varchar(255) not null,
  description varchar(255) not null,
  priority int not null,
  hasText boolean default 0,
  dateFinish boolean default 0,
  created_at datetime default now(),
  boss int not null,
  target int not null
);

create table signature(
  id int primary key AUTO_INCREMENT,
  name varchar(56) NOT NULL,
  user_id int NOT NULL,
  path varchar(255) NOT NULL,
  created_at varchar(20) NOT NULL
);