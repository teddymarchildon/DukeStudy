CREATE TABLE Student
(NetID CHAR(5) NOT NULL primary key,
Name VARCHAR(256) NOT NULL,
GPA DECIMAL(4,3),
Favorite_Class CHAR(7),
Favorite_Professor VARCHAR(256),
Primary_Major VARCHAR(256),
Primary_Minor VARCHAR(256),
Certificate VARCHAR(256));

CREATE TABLE Tutor
(NetID CHAR(5) NOT NULL primary key,
Rate_Per_Hour DECIMAL(4,2),
Days_Available CHAR(12),
FOREIGN KEY (NetID) REFERENCES Student(NetID));

CREATE TABLE Course
(Course_Number CHAR(7) NOT NULL primary key,
Department VARCHAR(256) NOT NULL,
Level DECIMAL(3,0) NOT NULL,
Prerequesites VARCHAR(256),
When_Class_Meets VARCHAR(256) NOT NULL,
UNIQUE (Department, Level));

CREATE TABLE Tutors_For
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
PRIMARY KEY (NetID, Course_Number),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number));

CREATE TABLE Professor
(Name VARCHAR(256) NOT NULL,
Department VARCHAR(256) NOT NULL,
Email VARCHAR(256),
PRIMARY KEY (Name, Department));

CREATE TABLE Teaches_Course
(Professor_Name VARCHAR(256) NOT NULL,
Professor_Department VARCHAR(256) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester CHAR(11) NOT NULL,
Section_Number DECIMAL(3,0) NOT NULL,
PRIMARY KEY (Course_Number, Year_Semester, Section_Number),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number),
FOREIGN KEY (Professor_Name, Professor_Department) REFERENCES Professor(Name, Department));

CREATE TABLE TAs_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester CHAR(11) NOT NULL,
Section_Number DECIMAL(3,0) NOT NULL,
PRIMARY KEY (NetID, Course_Number, Year_Semester, Section_Number),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number, Year_Semester, Section_Number) REFERENCES Teaches_Course(Course_Number, Year_Semester, Section_Number));

CREATE TABLE Study_Group
(Group_ID DECIMAL(4,0) NOT NULL PRIMARY KEY,
Course_Number CHAR(7) NOT NULL,
Year_Semester CHAR(11) NOT NULL);

CREATE TABLE Takes_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester CHAR(11) NOT NULL,
Section_Number DECIMAL(3,0),
Grade CHAR(2),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Course_Number, Year_Semester, Section_Number) REFERENCES Teaches_Course(Course_Number, Year_Semester, Section_Number));

CREATE TABLE Rates_Course
(NetID CHAR(5) NOT NULL,
Course_Number CHAR(7) NOT NULL,
Year_Semester CHAR(11) NOT NULL,
Section_Number DECIMAL(3,0),
Quality_Of_Course DECIMAL(1,0),
Quality_Of_Instruction DECIMAL(1,0),
Difficulty DECIMAL(1,0),
Workload DECIMAL(1,0),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID, Course_Number, Year_Semester) REFERENCES Takes_Course(NetID, Course_Number, Year_Semester));

CREATE TABLE In_Study_Group
(Group_ID DECIMAL(4,0) NOT NULL,
NetID CHAR(5) NOT NULL,
PRIMARY KEY (Group_ID, NetID),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Group_ID) REFERENCES Study_Group(Group_ID));
