COPY Course(Course_Number, Department, Level, Tags, Prerequesites, When_Class_Meets)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/course.csv' DELIMITER ',';

COPY Student(NetID, Name, Primary_Major, Primary_Minor, GPA, Favorite_Professor, Favorite_Class)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/student.csv' DELIMITER ',' CSV HEADER;

COPY Tutor(NetID, Rate_Per_Hour, Days_Available)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/tutor.csv' DELIMITER ',' CSV HEADER;

-- COPY Tutors_For(NetID, Course_Number)
-- FROM '/vagrant/Project/DukeStudy-master/sCS316_Final_Project/tutors_for.csv' DELIMITER ',' CSV HEADER;

COPY Professor(Name, NetID, Email, Department)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/professor.csv' DELIMITER ',' CSV HEADER;

-- COPY Teaches_Course(Course_Number, Year_Semester, Professor_Name, Professor_Department)
-- FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/teaches_course.csv' DELIMITER ',' CSV HEADER;

-- COPY TAs_Course(NetID, Course_Number, Year_Semester)
-- FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/tas_course.csv' DELIMITER ',' CSV HEADER;

COPY Study_Group(Group_ID, Course_Number, Year_Semester)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/study_group.csv' DELIMITER ',' CSV HEADER;

-- COPY Takes_Course(NetID, Course_Number, Year_Semester, Grade)
-- FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/takes_course.csv' DELIMITER ',' CSV HEADER;

-- COPY Rates_Course(NetID, Course_Number, Year_Semester, Quality_Of_Course, Quality_Of_Instruction, Difficulty, Workload)
-- FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/rates_course.csv' DELIMITER ',' CSV HEADER;

COPY In_Study_Group(Group_ID, NetID)
FROM '/vagrant/Project/DukeStudy-master/CS316_Final_Project/in_study_group.csv' DELIMITER ',' CSV HEADER;
