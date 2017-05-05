drop database userBlackList;
create database userBlackList;

-- ------------------------
-- User Table
-- ------------------------
create table userBlackList.users(
id INT(10) NOT NULL AUTO_INCREMENT UNIQUE,
login varchar(8) NOT NULL UNIQUE,
password varchar(15) not null,
name varchar(20) NOT NULL,
surname varchar(30) ,
primary key (id)
);

create table userBlackList.blackList(
id int(10) not null auto_increment unique,
id_user int(10),
primary key(id),
foreign key(id_user) references Users(id)
);

create table userBlackList.roles(
id int(10) not null auto_increment unique,
role varchar(6) not null,
primary key(id)
);

create table userBlackList.role_has_user(
id_user int(10) not null,
id_role int(10) not null,
foreign key(id_role) references Roles(id),
foreign key(id_user) references Users(id)
);

insert into userBlackList.users(login,name,surname,password) value ("admin","admin","admin","admin");
insert into userBlackList.users(logAin,name,surname,password) value ("user1","test1","first","user");
insert into userBlackList.users(login,name,surname,password) value ("user2","test2","second","user");
insert into userBlackList.users(login,name,surname,password) value ("user3","test3","third","user");
insert into userBlackList.users(login,name,surname,password) value ("user4","test4","fourth","user");

insert into userBlackList.roles(role) value ("admin");
insert into userBlackList.roles(role) value ("user");

insert into userBlackList.role_has_user(id_user,id_role) value (1,1);

insert into userBlackList.blacklist(id_user) value (3);