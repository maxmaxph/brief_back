create database BRIEFDB

create table "user"(
id SERIAL PRIMARY KEY,
firstname VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password CHAR(60) NOT null);

create table "category"(
id SERIAL PRIMARY KEY, 
name VARCHAR(50) NOT null);

create table "product"(
id SERIAL PRIMARY KEY, 
name VARCHAR(100) not null,
price decimal(6,2)not null,
quantity int not null,
category_id int not null,
CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES "category"(id));

insert into category (name) values ('phone'),('watch') ,('accessory');

insert into product (name,price,quantity,category_id) values
('IPhone 24', '2800', 9 , 1),
('Oppo Reno 14', '1500.7', 16 , 1),
('Samsung  S45 Ultra Zboubi', '3500', 24 , 1),
('Huawei Zyklon Z zgenfly ', '2900.80', 7 , 1),
('Pear Watch Ultra', '8000', 32, 2),
('TchingTchong Galaxy Watch27', '4960.47', 99 , 2),
('Xixung yo Watch', '3289.41', 15, 2),
('Garmin Vivoactive 4S', '225.66', 5 , 2),
('Coque Docking Oppo reno 14', '127.90', 3 , 3),
('TchingTchong Pack charge', '47.36', 4 , 3),
('Pear Air Gods 27Gen', '190', 59 , 3);

--hello Louis and jeremy! You have ton complete this values

insert into "user" (firstname, last_name, email, "password") values ('', '', '', ''); 