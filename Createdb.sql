CREATE TABLE Course
(Course_Number CHAR(7) NOT NULL primary key,
Department VARCHAR(256) NOT NULL,
Level VARCHAR(10) NOT NULL,
Tags VARCHAR(50),
Prerequesites VARCHAR(256),
UNIQUE (Department, Level));

CREATE TABLE Student
(NetID CHAR(5) NOT NULL primary key,
Name VARCHAR(256) NOT NULL,
GPA DECIMAL(4,3),
Favorite_Class VARCHAR(7),
Favorite_Professor VARCHAR(256),
Primary_Major VARCHAR(256),
Primary_Minor VARCHAR(256),
Certificate VARCHAR(256),
FOREIGN KEY (Favorite_Class) REFERENCES Course(Course_Number));

CREATE TABLE Tutor
(NetID CHAR(5) NOT NULL primary key,
Rate_Per_Hour DECIMAL(4,2),
Days_Available VARCHAR(20),
FOREIGN KEY (NetID) REFERENCES Student(NetID));

CREATE TABLE Tutors_For
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
PRIMARY KEY (NetID, Course_Number),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number));

CREATE TABLE Professor
(NetID CHAR(5) NOT NULL primary key,
Name VARCHAR(256) NOT NULL,
Department VARCHAR(256) NOT NULL,
Email VARCHAR(256),
UNIQUE (Name, Department));

CREATE TABLE Teaches_Course
(Professor_Name VARCHAR(256) NOT NULL,
Professor_Department VARCHAR(256) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
When_Class_Meets VARCHAR(256) NOT NULL,
-- Section_Number DECIMAL(3,0) NOT NULL,
PRIMARY KEY (Course_Number, Year_Semester),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number),
FOREIGN KEY (Professor_Name, Professor_Department) REFERENCES Professor(Name, Department));

CREATE TABLE TAs_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
-- Section_Number DECIMAL(3,0) NOT NULL,
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number, Year_Semester) REFERENCES Teaches_Course(Course_Number, Year_Semester));

CREATE TABLE Study_Group
(Group_ID DECIMAL(4,0) NOT NULL PRIMARY KEY,
Course_Number CHAR(7) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL);

CREATE TABLE Takes_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
-- Section_Number DECIMAL(3,0),
Grade DECIMAL(3,0),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number, Year_Semester) REFERENCES Teaches_Course(Course_Number, Year_Semester));

CREATE TABLE Rates_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
-- Section_Number DECIMAL(3,0),
Quality_Of_Course DECIMAL(2,1),
Quality_Of_Instruction DECIMAL(2,1),
Difficulty DECIMAL(2,1),
Workload DECIMAL(2,1),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID, Course_Number, Year_Semester) REFERENCES Takes_Course(NetID, Course_Number, Year_Semester));

CREATE TABLE In_Study_Group
(Group_ID DECIMAL(4,0) NOT NULL,
NetID CHAR(5) NOT NULL,
PRIMARY KEY (Group_ID, NetID),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Group_ID) REFERENCES Study_Group(Group_ID));
