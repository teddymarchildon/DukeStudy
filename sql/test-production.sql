--all the courses that the professor is teaching this semester and when that class meets 
select Course_Number
from Course 
where Professor_Name = 'Jun Yang'
group by Course_Number
limit 10;

-- students that have voted him their favorite professor - check! 

select distinct NetID
from Student 
where Favorite_Professor = 'Jun Yang'
limit 10;



-- 10 students that have taken this course (random)
select NetID, Course_Number
from Takes_Course 
where Course_Number = '82'
group by NetID, Course_Number
limit 10;

--classes taught by your favorite professor, check 
select t.Professor_Name, t.Course_Number 
from Student s, Teaches_Course t 
where NetID = 'aa111'
and s.Favorite_Professor = t.Professor_Name
limit 10;

-- all the TAs that teach for a certain course - check 
select NetID
from TAs_Course 
where Course_Number = '82'
limit 10;

-- all the TAs that teach for a certain course - check 
select Course_Number
from Course  
where Prerequesites like '%ALP%'
limit 10;
