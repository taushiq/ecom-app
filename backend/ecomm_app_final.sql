ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin@123';
flush privileges;
SET SQL_SAFE_UPDATES = 0;

create database ecomm_app;

use ecomm_app;

CREATE TABLE `users` (
  `id` int NOT NULL auto_increment primary key,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) ,
  `lname` varchar(255) ,
  `age` int DEFAULT '18',
  `role` int DEFAULT '555',
  `photo` text,
  `type` varchar(255) NOT NULL, 
  `isloginin` boolean,
  `loginTime` datetime
);

delete from users;

insert into users values (2, 'taushiq.awais007@gmail.com', '098F6BCD4621D373CADE4E832627B4F6', 'taushiq.awais007@gmail.com', 'Taushiq', 'Awais', 18, 0, null, 'admin', null, null);

select * from users;
delete from users where type = 'admin';



CREATE TABLE `addresses` (
  `id` int NOT NULL auto_increment primary key ,
  `line1` varchar(255) DEFAULT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

delete from addresses;

drop table categories;

CREATE TABLE `categories` (
  `id` int NOT NULL auto_increment primary key,
  `title` varchar(255) NOT NULL,
  `image` text NOT NULL
) ;


INSERT INTO categories VALUES
(1, 'Shoes', 'https://m.media-amazon.com/images/I/41Leu3gBUFL.jpg'),
(2, 'Electronics', 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/m/a/maldives_15_df_jetblack_nt_hdcam_nonodd_nonfpr_coreset_front_hi_res.png');

select * from categories;

CREATE TABLE `products` (
  `id` int NOT NULL auto_increment primary key,
  `title` varchar(255) NOT NULL,
  `image` text,
  `images` text ,
  `description` text NOT NULL,
  `long_description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `short_desc` varchar(1000) NOT NULL,
  `cat_id` int not null,
  `lock` boolean not null,
  FOREIGN Key (cat_id) references categories(id)
);

select * from products;
delete from products;


INSERT INTO `products` VALUES
(1, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd;https://static.toiimg.com/thumb/msid-56933980,width-640,resizemode-4,imgsize-85436/56933980.jpg;https://cdn.mos.cms.futurecdn.net/3328be45e8c7fe5194055b4c687fb769-1200-80.jpeg;https://img.etimg.com/thumb/width-640,height-480,imgsize-76492,resizemode-1,msid-52464286/46.jpg', 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 0, 'Gaming console', 2, false),
(2, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg;https://i.ebayimg.com/images/g/eQgAAOSw2XdePfc0/s-l640.jpg;https://i.ebayimg.com/images/g/j~gAAOSwQ6FdG9Eh/s-l640.jpg;https://i.ebayimg.com/images/g/OesAAOSwDnpeJhWN/s-l640.jpg', 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description', 59, 51, 'SPORTS SHOES', 1, false),
(3, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 69, 'SPORTS SHOES', 1, false),
(4, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description',  250, 78, 'Gaming console', 2, false),
(5, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description',  240, 83, 'Gaming console', 2, false),
(6, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description',  59, 1, 'SPORTS SHOES', 1, false),
(7, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 95, 'SPORTS SHOES', 1, false),
(8, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(9, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 100, 'Gaming console', 2, false),
(10, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(11, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(12, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(13, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 68, 'Gaming console', 2, false),
(14, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(15, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(16, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description',  250, 100, 'Gaming console', 2, false),
(17, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description',  240, 100, 'Gaming console', 2, false),
(18, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description',  59, 80, 'SPORTS SHOES', 1, false),
(19, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(20, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(21, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.','Long Description',  240, 100, 'Gaming console', 2, false),
(22, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(23, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear','Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(24, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(25, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.','Long Description',  240, 100, 'Gaming console', 2, false),
(26, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(27, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(28, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(29, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 100, 'Gaming console', 2, false),
(30, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(31, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(32, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 88, 'Gaming console', 2, false),
(33, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(34, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(35, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(36, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 100, 'Gaming console', 2, false),
(37, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(38, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear','Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(39, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(40, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description', 59, 100, 'SPORTS SHOES', 1, false),
(41, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear', 'Long Description', 39, 100, 'SPORTS SHOES', 1, false),
(42, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***','Long Description',  250, 100, 'Gaming console', 2, false),
(43, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.', 'Long Description', 240, 100, 'Gaming console', 2, false),
(44, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training', 'Long Description', 59, 100, 'SPORTS SHOES', 1, false),
(45, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear','Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(46, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(47, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(48, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear','Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(49, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false),
(50, 'PlayStation 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSr-iFW5W8n3_jxNKiclAP_k71Fi9PGcojsMUC-vb8zbwJthbBd', NULL, 'With PS4, gaming becomes a lot more power packed. Ultra-fast processors, high-performance system, real-time game sharing, remote play and lots more makes it the ultimate companion device.','Long Description',  240, 100, 'Gaming console', 2, false),
(51, 'PEGASUS 33 Running Shoes For Men', 'https://i.pinimg.com/originals/43/40/8e/43408ee5a8d234752ecf80bbc3832e65.jpg', NULL, 'The Nike Zoom Pegasus Turbo 2 is updated with a feather-light upper, while innovative foam brings revolutionary responsiveness to your long-distance training','Long Description',  59, 100, 'SPORTS SHOES', 1, false),
(52, 'MEN\'S ADIDAS RUNNING KALUS SHOES', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrEqFHfSbs6rUzcYnN_PcnS_D2JLXusKMVFk4Y8N_tn3hJgNIf', NULL, 'A well cushioned shoe with a fresher look that will appeal to young runners. Features Mesh upper for maximum ventilation, lightstrike IMEVA midsole with visible adiprene providing protection from harmful impact forces and durable Rubber outsole for long-lasting wear','Long Description',  39, 100, 'SPORTS SHOES', 1, false),
(53, 'Xbox One X Star Wars Jedi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ufSADR9EyusxEfgMLErqISEcKVzQyjoD81zWcdpBvuEGBnYP', NULL, 'Own the Xbox One X Star Wars Jedi: Fallen Order™ Bundle and step into the role of a Jedi Padawan who narrowly escaped the purge of Order 66. This bundle includes a full-game download of Star Wars Jedi: Fallen Order™ Deluxe Edition, a 1-month trial of Xbox Game Pass for console and Xbox Live Gold, and 1-month of EA Access.***', 'Long Description', 250, 100, 'Gaming console', 2, false);


CREATE TABLE `order_details` (
  `id` int NOT NULL auto_increment primary key,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL, 
  `user_id` int Not null,
  `address_details` json Not NULL,
  `order_status` varchar(100) default 'Will be delivered soon!',
  `delivery_date` varchar(20),
  `delivered_date` varchar(20),
  FOREIGN KEY (product_id) references products(id),
  FOREIGN KEY (user_id) references users(id)
) ;

select * from order_details;
delete from order_details;


CREATE TABLE `cancelled_orders` (
  `id` int NOT NULL auto_increment primary key,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL, 
  `user_id` int Not null,
  `order_id` int Not null,
  `cancelled_on` timestamp default Now(),
  FOREIGN KEY (user_id) references users(id)
);

delete from cancelled_orders;

delete from order_details;


update order_details set order_status = 'delivered' where id = 2;
update order_details set delivered_date = '15-Jun-2021' where id = 2;
update order_details set delivery_date = '15-Oct-2021' where id = 17;

update order_details set delivery_date = '15-Jun-2021' where id = 1;



create table `otp_stage` (
    `email` varchar(70) NOT NULL primary key,
    `otp` int NOT NULL
);










