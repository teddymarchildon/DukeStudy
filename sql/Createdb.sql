-- Section Numbers have been removed as this data is not available to us through the Duke API

-- Cross-listed courses will have the same first 6 numbers with another number at the end
CREATE TABLE Course
(Course_Number CHAR(10) NOT NULL primary key,
Department VARCHAR(256) NOT NULL,
Level VARCHAR(10) NOT NULL,
Tags VARCHAR(50),
Prerequesites VARCHAR(256),
UNIQUE (Department, Level));

CREATE TABLE Professor
(NetID CHAR(10) NOT NULL primary key,
Name VARCHAR(256) NOT NULL,
Department VARCHAR(256) NOT NULL,
Email VARCHAR(256),
Phone_Number VARCHAR(20),
UNIQUE (Name, Department));

-- Added Graduation Year
CREATE TABLE Student
(NetID CHAR(10) NOT NULL primary key,
Name VARCHAR(256) NOT NULL,
GPA DECIMAL(4,3),
Favorite_Class CHAR(10),
Favorite_Professor CHAR(10),
Primary_Major VARCHAR(256),
Primary_Minor VARCHAR(256),
Secondary_Major VARCHAR(256),
Certificate VARCHAR(256),
Graduation_Year DECIMAL(4,0),
FOREIGN KEY (Favorite_Class) REFERENCES Course(Course_Number),
FOREIGN KEY (Favorite_Professor) REFERENCES Professor(NetID));

CREATE TABLE Tutor
(NetID CHAR(10) NOT NULL primary key,
Rate_Per_Hour DECIMAL(4,2),
Days_Available VARCHAR(20),
FOREIGN KEY (NetID) REFERENCES Student(NetID));

CREATE TABLE Tutors_For
(NetID CHAR(10) NOT NULL,
Course_Number CHAR(10) NOT NULL,
PRIMARY KEY (NetID, Course_Number),
FOREIGN KEY (NetID) REFERENCES Tutor(NetID),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number));

-- Professor will only be assigned to the main number, not cross-listed ones
CREATE TABLE Teaches_Course
(Professor_NetID CHAR(10) NOT NULL,
Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
When_Class_Meets VARCHAR(256) NOT NULL,
Location VARCHAR(256),
PRIMARY KEY (Professor_NetID, Course_Number, Year_Semester, When_Class_Meets),
FOREIGN KEY (Course_Number) REFERENCES Course(Course_Number),
FOREIGN KEY (Professor_NetID) REFERENCES Professor(NetID));

-- Create index to help speed up foreign key trigger
CREATE INDEX Course_Offerings ON Teaches_Course(Course_Number,Year_Semester);

-- Create table to help speed up foreign key trigger
CREATE TABLE Course_Semesters
(Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
primary key (Course_Number, Year_Semester));

CREATE TABLE TAs_Course
(NetID CHAR(10) NOT NULL,
Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID) REFERENCES Student(NetID));

CREATE TABLE Study_Group
(Group_ID DECIMAL(4,0) NOT NULL PRIMARY KEY,
Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL);

CREATE TABLE Takes_Course
(NetID CHAR(10) NOT NULL,
Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
Grade DECIMAL(3,0),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID) REFERENCES Student(NetID));

CREATE TABLE Rates_Course
(NetID CHAR(10) NOT NULL,
Course_Number CHAR(10) NOT NULL,
Year_Semester VARCHAR(20) NOT NULL,
Quality_Of_Course DECIMAL(2,1),
Quality_Of_Instruction DECIMAL(2,1),
Difficulty DECIMAL(2,1),
Workload DECIMAL(2,1),
PRIMARY KEY (NetID, Course_Number, Year_Semester),
FOREIGN KEY (NetID, Course_Number, Year_Semester) REFERENCES Takes_Course(NetID, Course_Number, Year_Semester));

CREATE TABLE In_Study_Group
(Group_ID DECIMAL(4,0) NOT NULL,
NetID CHAR(10) NOT NULL,
PRIMARY KEY (Group_ID, NetID),
FOREIGN KEY (NetID) REFERENCES Student(NetID),
FOREIGN KEY (Group_ID) REFERENCES Study_Group(Group_ID));

-- Function to check TAs_Course, Takes_Course Foreign Keys
CREATE FUNCTION TF_ForeignKey() RETURNS TRIGGER AS $$
  BEGIN
    -- IF (SELECT distinct Course_Number, Year_Semester FROM new) NOT IN (SELECT Course_Number, Year_Semester FROM Teaches_Course)
    IF (new.Course_Number, new.Year_Semester) IN (SELECT * FROM Course_Semesters)
      THEN RETURN new;
    ELSE raise exception 'Foreign Key Violation';
    end if;
  END;
  $$ LANGUAGE plpgsql;

CREATE TRIGGER TG_ForeignKey_TAs_Course
  BEFORE DELETE OR UPDATE OR INSERT ON TAs_Course
  FOR EACH ROW
  EXECUTE PROCEDURE TF_ForeignKey();

CREATE TRIGGER TG_ForeignKey_Takes_Course
  BEFORE INSERT ON Takes_Course
  FOR EACH ROW
  EXECUTE PROCEDURE TF_ForeignKey();

-- Function to make sure all API tables arent deleted or updated
CREATE FUNCTION TF_InsertOnly() RETURNS TRIGGER AS $$
BEGIN
  if TG_OP = 'DELETE' then raise exception 'Cannot delete from API tables';
  elseif TG_OP = 'UPDATE' then raise exception 'Cannot update API tables';
  end if;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Only_Insert_Course
  BEFORE DELETE OR UPDATE ON Course
  FOR EACH ROW
  EXECUTE PROCEDURE TF_InsertOnly();

CREATE TRIGGER Only_Insert_Student
  BEFORE DELETE OR UPDATE ON Student
  FOR EACH ROW
  EXECUTE PROCEDURE TF_InsertOnly();

CREATE TRIGGER Only_Insert_Professor
  BEFORE DELETE OR UPDATE ON Professor
  FOR EACH ROW
  EXECUTE PROCEDURE TF_InsertOnly();

CREATE TRIGGER Only_Insert_Teaches_Course
  BEFORE DELETE OR UPDATE ON Teaches_Course
  FOR EACH ROW
  EXECUTE PROCEDURE TF_InsertOnly();

CREATE TRIGGER Only_Insert_Takes_Course
  BEFORE DELETE OR UPDATE ON Takes_Course
  FOR EACH ROW
  EXECUTE PROCEDURE TF_InsertOnly();
