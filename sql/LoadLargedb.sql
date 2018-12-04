COPY Course(Course_Number, Department, Level, Prerequesites, Tags)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/course.csv' DELIMITER ',';

COPY Professor(NetID, Name, Email, Department, Phone_Number)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/professor.csv' DELIMITER ',';

COPY Student(NetID, Name, Primary_Major, Primary_Minor, Secondary_Major, Graduation_Year, GPA, Favorite_Professor, Favorite_Class)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/student.csv' DELIMITER ',';

COPY Tutor(NetID, Rate_Per_Hour, Days_Available)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/tutor.csv' DELIMITER ',';

COPY Tutors_For(NetID, Course_Number)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/tutors_for.csv' DELIMITER ',';

COPY Teaches_Course(Professor_NetID, Course_Number, Year_Semester, When_Class_Meets, Location)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/teaches_course.csv' DELIMITER ',';

INSERT INTO Course_Semesters(Course_Number, Year_Semester) SELECT DISTINCT Course_Number, Year_Semester FROM Teaches_Course;

COPY TAs_Course(NetID, Course_Number, Year_Semester)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/tas_course.csv' DELIMITER ',';

COPY Study_Group(Group_ID, Course_Number, Year_Semester)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/study_group.csv' DELIMITER ',';

COPY Takes_Course(NetID, Course_Number, Year_Semester, Grade)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/takes_course.csv' DELIMITER ',';

COPY Rates_Course(NetID, Course_Number, Year_Semester, Quality_Of_Course, Quality_Of_Instruction, Difficulty, Workload)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/rates_course.csv' DELIMITER ',';

COPY In_Study_Group(Group_ID, NetID)
FROM '/home/ted_marchildon/DukeStudy/CS316_Final_Project/in_study_group.csv' DELIMITER ',' CSV HEADER;
