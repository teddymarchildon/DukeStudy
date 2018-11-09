-- students that have voted him their favorite professor - check! 

select distinct NetID
from Student 
where Favorite_Professor = 'Ashley Moskovich'
limit 10;


-- tutors that are avaliable on a given day 
select NetID, Days_Available, Rate_Per_Hour
from Tutor tt 
where Days_Available like '%F%'
and Rate_Per_Hour < 15
limit 10;



-- all the TAs that teach for a certain course - check 
select Course_Number
from Course  
where Tags like '%ALP%'
limit 10;
