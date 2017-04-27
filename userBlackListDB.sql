drop database userBlackList;
create database userBlackList;

-- ------------------------ 
-- User Table
-- ------------------------ 
create table userBlackList.users(
id INT(10) NOT NULL AUTO_INCREMENT UNIQUE,
login varchar(8) NOT NULL UNIQUE,
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

insert into userBlackList.users(login,name,surname) value ("user1","test1","first");
insert into userBlackList.users(login,name,surname) value ("user2","test2","second");
insert into userBlackList.users(login,name,surname) value ("user3","test3","third");
insert into userBlackList.users(login,name,surname) value ("user4","test4","fourth");

insert into userBlackList.blacklist(id_user) value (3);