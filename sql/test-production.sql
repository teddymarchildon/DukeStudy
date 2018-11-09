--all the courses that the professor is teaching this semester - check! 
select Course_Number
from Teaches_Course 
where Professor_Name = 'Jun Yang'
and Year_Semester = 'Fall 2018'
group by Course_Number
limit 10;

-- students that have voted him their favorite professor - check! 

select distinct NetID
from Student 
where Favorite_Professor = 'Jun Yang'
limit 10;


-- 10 students that have taken his course (random) - of a certain current year?, check! 
select NetID, Course_Number
from Takes_Course 
where Course_Number = 'CS316'
group by NetID, Course_Number
limit 10;

--classes taught by your favorite professor, check 
select t.Professor_Name, t.Course_Number 
from Student s, Teaches_Course t 
where NetID = 'aa111'
and s.Favorite_Professor = t.Professor_Name
and Year_Semester = 'Fall 2018'
limit 10;

-- students that have voted him their favorite professor - check! 

select distinct NetID
from Student 
where Favorite_Professor = 'Jun Yang'
limit 10;
