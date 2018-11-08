-- easiest classes at Duke, check
select Course_Number, avg(Difficulty) as avgDifficulty
from Rates_Course 
group by Course_Number 
order by avg(Difficulty) asc 
limit 10;

-- classes with the least work at Duke, check 
select Course_Number, avg(WorkLoad) as avgWorkload
from Rates_Course 
group by Course_Number 
order by avg(WorkLoad) asc 
limit 10;

-- classes with the least work at Duke in your major, need to add the XXX, check 
select c.Course_Number, avg(WorkLoad) as avgWorkload
from Rates_Course r, Student s, Course c  
where s.NetID = 'mmd21'
and s.Primary_Major = c.Department 
and c.Course_Number = r.Course_Number
group by c.Course_Number 
order by avg(WorkLoad) asc 
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
