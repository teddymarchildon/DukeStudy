--SQL Queries

-- What users have taken the course before? With this information, the user can find the people who have taken it and
--email them to find out more information about the course and opinions.
-- parameters: course_number c, tested: yes, works
select netid
from Takes_Course
where Course_Number = 'BME244';

-- for a given course, what is the mean hours studied, average difficulty rating, mean number of hours studied and mean grade?
-- parameter: course_number c, example 'CS316'
select avg(Quality_Of_Course) as avgQualityRating, avg(Quality_Of_Instruction) as avgInstructionRating,
avg(Difficulty) as avgDifficulty, avg(WorkLoad) as avgWorkload
from Rates_Course
where Course_number = 'BME244';
--same query but divided by teacher so students can see if which teacher they should take a course with
-- parameter: Course_number, example for testing 'BME244'
select t.Professor_Name, avg(Quality_Of_Course) as avgQualityRating, avg(Quality_Of_Instruction) as avgInstructionRating, avg(Difficulty) as avgDifficulty, avg(WorkLoad) as avgWorkload
from Teaches_Course t, Rates_Course r
where t.Course_number = r.Course_number
and t.Year_Semester = r.Year_Semester
and t.Section_Number = r.Section_Number
and t.Course_number = 'CS316'
group by t.Professor_Name
order by avg(Quality_Of_Course) desc;
-- Ranking of the most liked professors at Duke and their department
select Favorite_Professor, Department, count(*) as numStudentswhoLikedProf
from Student s, Professor p
where s.Favorite_Professor= p.name
group by Favorite_Professor, Department
order by count(*) desc
limit 10;
-- in order to help users create study groups, what are the netids of other students taking the same course in the same semester?
-- parameters: course_number and year_semester (should I also include )
select netid
from Takes_Course
where Course_Number = 'CS316'
and Year_Semester = 'Fall 2018';

-- rank the courses by the average difficulty rating to find the easiest course in the database
select Course_Number, avg(Difficulty) as avgDifficulty
from Rates_Course
group by Course_Number
order by avg(Difficulty) asc
limit 10;
-- rank the courses by the average difficulty rating to find the easiest course given a certain department
select r.Course_Number, avg(Difficulty) as avgDifficulty
from Rates_Course r, Course c
where r.Course_Number = c.Course_Number
and c.Department = 'Chemistry'
group by r.Course_Number
order by avg(Difficulty) asc
limit 10;

-- -- what is the most favorite class at Duke
select Favorite_Class, count(*) as numStudentsLikedClass
from Student
group by Favorite_Class
order by count(*) desc
limit 10;

--what is the most favorite class in a certain department? parameter - Department
select Favorite_Class, Department, count(*) as numStudentsLikedClass
from Student s, Course c
where s.Favorite_Class = c.Course_Number
and c.Department = 'Computer Science'
group by Favorite_Class, Department
order by count(*) desc
limit 10;
-- show all the tutors for a particular class and their rate, their days available
select Course_Number, Rate_Per_Hour, Days_Available
from Tutors_For tu, Tutor tt
where tu.NetID = tt.NetID
and tu.Course_Number = 'CS201';

-- show all the tutors that are lower than a certain price point p
select Course_Number, Rate_Per_Hour, Days_Available
from Tutors_For tu, Tutor tt
where tu.NetID = tt.NetID
and tu.Course_Number = 'CS201'
and Rate_Per_Hour < 10;

-- who are other students with your same major?
select NetID
from Student
where Primary_Major = 'Computer Science';

-- who are the TAs in your course in the same semester that could help you?
select NetID
from TAs_Course
where Course_Number = 'CHEM101'
and Year_Semester = 'Spring 2018';

-- SQL Data modifications

-- User updates their GPA, can apply to any attrubute for user
UPDATE Student
SET GPA = 4.0
WHERE NetID = 'jb151';

-- Course Days and Times Change, can apply to any attrubute for Course
UPDATE Course
SET When_Class_Meets = 'WF 3:05-4:20'
WHERE Course_Number = 'CS201';

-- Tutor increases their hourly Rate
UPDATE Tutor
SET Rate_Per_Hour = 13.00
WHERE NetID = 'jb151';

-- Student gets regrade request
UPDATE Takes_Course
SET Grade = 'A'
WHERE NetID = 'mmd21'
AND Course_Number = 'CHEM101'
AND Year_Semester = 'Spring 2018';

-- Student wants to change their rating
UPDATE Rates_Course
SET Difficulty = 5
WHERE NetID = 'mmd21'
AND Course_Number = 'CHEM101'
AND Year_Semester = 'Spring 2018';

-- TA Switches Section
UPDATE TAs_Course
SET Section_Number = 04
WHERE NetID = 'cfp65'
AND Course_Number = 'BME244'
AND Year_Semester = 'Spring 2017';
