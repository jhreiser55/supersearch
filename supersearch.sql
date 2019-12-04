DROP DATABASE IF EXISTS places;
CREATE DATABASE places;
\c places

CREATE TABLE movies(
	movieID SERIAL PRIMARY KEY,
	movie TEXT,
	theater TEXT,
	address TEXT,
	city TEXT,
	zip INTEGER
);

INSERT INTO movies (movie, theater, address, city, zip) VALUES
('Nobody''s Watching', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('It', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Limehouse Golem', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Despicable Me 3', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Wonder Woman', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('The Emoji Movie', 'Regal Fredericksburg 15', '3301 Plank Road Route 3W', 'Fredericksburg', 22401),
('Year By The Sea', 'Marquee Cinemas Southpoint 9', '5800 South Point Centre', 'Fredericksburg',  22401),
('Rememory', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Wonder Woman', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Dunkirk', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005),
('Anti Matter', 'Allen Cinema 4 Mesilla Valley', '700 South Telshor Boulevard', 'Las Cruces', 88005);

CREATE TABLE stores(
	storeID SERIAL PRIMARY KEY,
	name TEXT,
	type TEXT,
	address TEXT,
	city TEXT,
	zip INTEGER
);

INSERT INTO stores (name, address, city, zip) VALUES
('Hyperion Espresso', '301 William St.',  'Fredericksburg', 22401),
('Starbucks', '2001 Plank Road', 'Fredericksburg', 22401),
('25 30 Expresso', '400 Princess Anne St', 'Fredericksburg', 22401),
('Agora Downtown', '520 Caroline St', 'Fredericksburg', 22401),
('Highpoint Coffee', '615 Caroline St', 'Fredericksburg', 22401),
('Duck Donuts', '1223 Jefferson Davis Hwy', 'Fredericksburg', 22401),
('Basilico', '2577 Cowan Blvd', 'Fredericksburg',  22401),
('Cork and Table', '909 Caroline', 'Fredericksburg',  22401),
('Orofino', '1251 Carl D Silver Parkway', 'Fredericksburg',  22401),
('Pancho Villa Mexican Rest', '10500 Spotsylvania Ave', 'Fredericksburg', 22401),
('Chipotle', '5955 Kingstowne', 'Fredericksburg', 22401),
('Sedona Taphouse', '591 Williams', 'Fredericksburg', 22401),
('Pueblo''s Tex Mex Grill' , '1320 Jefferson Davis Hwy', 'Fredericksburg', 22401),
('El Pino', '4211 Plank Road', 'Fredericksburg', 22401),
('Starbucks', '2808 Telshor Blvd', 'Las Cruces', 88005),
('Starbucks', '2511 Lohman Ave', 'Las Cruces', 88005),
('Milagro Coffee Y Espresso', '1733 E. University Ave', 'Las Cruces', 88005),
('Starbucks', '1500 South Valley',  'Las Cruces', 88005),
('Bean', '2011 Avenida De Mesilla',  'Las Cruces', 88005),
('El Comedor', '2190 Avenida De  Mesilla', 'Las Cruces', 88005),
('Los Compas', '603 S Nevarez St.',  'Las Cruces', 88005),
('La Fuente', '1710 S Espina',  'Las Cruces', 88005),
('La Posta', '2410 Calle De San Albino',  'Las Cruces', 88005),
('El Jacalito', '2215 Missouri Ave',  'Las Cruces', 88005),
('Peet''s', '2260 Locust',  'Las Cruces', 88005);

CREATE TABLE types(
	storeID INTEGER,
	typeName TEXT,
	PRIMARY KEY(storeID, typeName)
);

INSERT INTO types (storeID, typeName) VALUES
(1,'coffee'),
(1,'breakfast'),
(2,'coffee'),
(2,'breakfast'),
(3,'coffee'),
(3,'breakfast'),
(4,'coffee'),
(4,'breakfast'),
(5,'coffee'),
(5,'breakfast'),
(6,'coffee'),
(6,'breakfast'),
(7,'Italian'),
(7,'restaurant'),
(8,'American'),
(8,'restaurant'),
(9,'Italian'),
(9,'sit-down'),
(10,'Mexican restaurant'),
(10,'sit-down'),
(11,'Mexican restaurant'),
(11, 'fast food'),
(12,'American'),
(12,'sit-down'),
(13,'Mexican restaurant'),
(13,'fast food'),
(14,'Mexican restaurant'),
(14,'sit-down'),
(15,'coffee'),
(15,'breakfast'),
(16,'coffee'),
(16,'breakfast'),
(17,'coffee'),
(17,'breakfast'),
(18,'coffee'),
(18,'breakfast'),
(19,'coffee'),
(19,'breakfast'),
(20,'Mexican restaurant'),
(20,'sit-down'),
(21,'Mexican restaurant'),
(21,'fast food'),
(22,'Mexican restaurant'),
(22,'sit-down'),
(23,'Mexican restaurant'),
(23,'fast food'),
(24,'Mexican restaurant'),
(24,'sit-down'),
(25,'coffee'),
(25,'breakfast');


CREATE TABLE users(
	userID SERIAL PRIMARY KEY,
	username TEXT UNIQUE,
	password TEXT,
	zip INTEGER
);

GRANT SELECT, INSERT ON movies TO supersearch;
GRANT SELECT, INSERT ON stores TO supersearch;
GRANT SELECT, INSERT ON types TO supersearch;
GRANT SELECT, INSERT ON users TO supersearch;
GRANT USAGE on users_userid_seq TO supersearch;
