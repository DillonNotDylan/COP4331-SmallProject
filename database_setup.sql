CREATE DATABASE smallproject;

CREATE TABLE smallproject.Users (
	UserID INT NOT NULL AUTO_INCREMENT,
	DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DateLastLoggedIn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FirstName varchar(255) NOT NULL DEFAULT '',
	LastName varchar(255) NOT NULL DEFAULT '',
	Username varchar(255) NOT NULL DEFAULT '',
	Password varchar(255) NOT NULL DEFAULT '',
	Primary Key (UserID)
)

ENGINE = InnoDB;

CREATE TABLE smallproject.ContactList (
	ContactID INT NOT NULL AUTO_INCREMENT,
	UserID INT,
	FirstName varchar(255) NOT NULL DEFAULT '',
	LastName varchar(255) NOT NULL DEFAULT '',
	PhoneNumber varchar(255) NOT NULL DEFAULT '',
	Email varchar(255) NOT NULL DEFAULT '',
	PRIMARY KEY (ContactID),
	FOREIGN KEY (UserID) REFERENCES smallproject.Users (UserID)
)

ENGINE = InnoDB;

INSERT INTO smallproject.Users (FirstName, LastName, Username, Password) 
VALUES ('Naruto', 'Uzumaki', 'Hokage', 'lord7th');

INSERT INTO smallproject.Users (FirstName, LastName, Username, Password) 
VALUES ('Kakashi', 'Hatake', 'TheCopyNinja', 'lord6th');

INSERT INTO smallproject.ContactList (FirstName, LastName, PhoneNumber, Email, UserID) 
VALUES ('Sasuke', 'Uchiha', '36363636', 'iloveitachi@gmail.com', 1);

INSERT INTO smallproject.ContactList (FirstName, LastName, PhoneNumber, Email, UserID)
VALUES ('Sakura', 'Haruno', '28008', 'ilovesasuke@gmail.com', 1);

INSERT INTO smallproject.ContactList (FirstName, LastName, PhoneNumber, Email, UserID)
VALUES ('Might', 'Guy', '12345', 'springtimeofyouth@gmail.com', 2);
