USE flushdb;
--use in flushdb dataseed
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("The Philadelphian", 2, "dark and dirty good just for washing your hands.", "bob99", "Male", "2019-12-08 20:53:21", "2019-12-08 20:53:21");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Maverik on 11415 s. 700 e.", 3, "if you need to go it's stop.", "jane56", "Female", "2019-12-08 20:53:22", "2019-12-08 20:53:22");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Five guys on 487 e. 12300 s.", 4, "you can sit and feel clean.", "bob99", "Male", "2019-12-08 20:53:23", "2019-12-08 20:53:23");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Mountain America Credit nion 12221 s. state st", 5, "you can lay on the floor and be clean.", "bob99", "Male", "2019-12-08 20:53:24", "2019-12-08 20:53:24");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Target 10130 state st.", 2, "use at own risk", "jane56", "Female", "2019-12-08 20:53:25", "2019-12-08 20:53:25");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Barnes & Noble 10180 state st.", 4, "better than using target.", "bob99", "Male", "2019-12-08 20:53:26", "2019-12-08 20:53:26");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Abravanel Hall 123 w. south temple", 5, "very clean and nice.", "jane56", "Female", "2019-12-08 20:53:27", "2019-12-08 20:53:27");
INSERT INTO posts (title, rating, tmi, user, gender, createdAt, updatedAt) VALUES ("Vivint Smart Home Arena", 1, "better take your own tolit cover.", "bob99", "Male", "2019-12-08 20:53:28", "2019-12-08 20:53:28");

--use in userdb dataseed
INSERT INTO users (userName, email, password, gender, createdAt, updatedAt) VALUES ("jane56, jane56@gmail.com, 11111111, Female", "2019-12-08 20:53:21", "2019-12-08 20:53:21");
INSERT INTO users (userName, email, password, gender, createdAt, updatedAt) VALUES ("bob99, bob99@gmail.com, 11111111, Male", "2019-12-08 20:53:22", "2019-12-08 20:53:22");
