exports.createUpdateStudentQueryString = function createStudentInsertQueryStringFromData(data) {
  var string = `UPDATE Student SET `;
  if (data['name'] !== null && data['name'] !== 'null') {
    string += `name=$1,`
  }
  if (data['major'] !== null && data['major'] !== 'null') {
    string += `primary_major=$2, `
  }
  if (data['minor'] !== null && data['minor'] !== 'null') {
    string += `primary_minor=$3, `
  }
  if (data['certificate'] !== null && data['certificate'] !== 'null') {
    string += `certificate=$4, `
  }
  if (data['favClass'] !== null && data['favClass'] !== 'null') {
    string += `favorite_class=$5, `
  }
  if (data['favProf'] !== null && data['favProf'] !== 'null') {
    string += `favorite_professor=$6, `
  }
  var result = string.trim().slice(0, -1);
  result += ` WHERE netid=$7;`
  return result;
}

exports.createSelectQueryString = function createSelectQueryStringFromData() {
  return `select s.*, p.Name as pName, c.Course_Number, c.Department, c.Level
  from Student s
  left join Professor p on p.NetID = s.Favorite_Professor
  left join Course c on s.Favorite_Class = c.Course_Number
  where s.NetID = $1;`
}

exports.createNewUserQueryString = function createNewUserQueryString() {
  return `INSERT INTO Student VALUES ($1, $2);`;
}

exports.groupsPageQueryString = function groupsPageQueryString() {
  return `SELECT * FROM
  In_Study_Group
  INNER JOIN
  Study_Group ON In_Study_Group.Group_ID=Study_Group.Group_ID
  INNER JOIN Course ON Study_Group.Course_Number=Course.Course_Number WHERE In_Study_Group.NetID != $1 AND In_Study_Group.Group_ID IN (SELECT Group_ID FROM In_Study_Group WHERE NetID=$1);`
}

exports.dropDownDepartmentQueryString = function dropDownDepartmentQueryString() {
  return `SELECT DISTINCT Department FROM Course;`
}

exports.dropDownCourseQueryString = function dropDownCourseQueryString() {
  return `SELECT Course_Number, Department, Level FROM Course WHERE
  Department=$1;`
}

exports.selectTutoringQueryString = function selectTutoringQueryString() {
  return `SELECT * FROM Tutor WHERE NetID=$1;`
}

exports.insertTutorQueryString = function insertTutorQueryString() {
  return `INSERT INTO Tutor VALUES ($1, $2, $3) ON CONFLICT (NetID) DO UPDATE SET Rate_Per_Hour=$2, Days_Available=$3;`
}

exports.allUsersQueryString = function allUsersQueryString() {
  return `SELECT Takes_Course.NetID, Name, Course_Number FROM
  Takes_Course INNER JOIN Student ON Takes_Course.NetID=Student.NetID
  WHERE Takes_Course.NetID != $1} AND Course_Number=$2;`
}

exports.insertStudyGroupQueryString = function insertStudyGroupQueryString() {
  return `INSERT INTO Study_Group VALUES ($1, $2, $3);`
}

exports.insertInStudyGroupQueryString = function insertInStudyGroupQueryString(groupID, users) {
  //We dont need to use string injection here since none of these values are input from the user
  //They come from the database only
  var string = 'INSERT INTO In_Study_Group VALUES ';
  for (user in users) {
    string += '(' + groupID + ', \'' + users[user].trim() + '\'),'
  }
  return string.slice(0, -1) + ';';
}

exports.removeUserFromGroupQueryString = function removeUserFromGroupQueryString() {
  return `DELETE FROM In_Study_Group WHERE Group_ID=$2 AND NetID=$1;`
}

exports.flowQueryString = function flowQueryString() {
  return `SELECT * FROM Student WHERE NetID=$1;`
}

exports.favoriteClassQueryString = function favoriteClassQueryString() {
  return `UPDATE Student SET Favorite_Class=$2 WHERE NetID=$1;`
}

exports.takesCourseQueryString = function takesCourseQueryString(netid, courses, semesters) {
  var string = 'INSERT INTO Takes_Course VALUES ';
  for (course in courses) {
    string += '(\'' + netid.trim() + '\', \'' + courses[course].courseNumber.trim() + '\', \'' + semesters[course].trim() + '\'' + '),'
  }
  return string.slice(0, -1) + ';';
}

exports.allProfessorsQueryString = function allProfessorsQueryString() {
  return 'SELECT NetID, Name FROM Professor;'
}

exports.courseSemestersQueryString = function courseSemestersQueryString() {
  return `SELECT * FROM Course_Semesters WHERE Course_Number=$1;`
}

exports.ratesCourseQueryString = function ratesCourseQueryString(netid, courses, semesters) {
  //We dont need to use string injection here since none of these values are input from the user
  //They come from the database only
  var string = `INSERT INTO Rates_Course VALUES `;
  for (course in courses) {
    let qualityRating = courses[course].qualityRating;
    let instructionRating = courses[course].qualityInstructionRating;
    let difficulty = courses[course].difficultyRating;
    let workload = courses[course].workloadRating;
    string += `(\'${netid.trim()}\', \'${courses[course].courseNumber.trim()}\', \'${semesters[course]}\', ${qualityRating}, ${instructionRating}, ${difficulty}, ${workload}), `
  }
  return string.trim().slice(0, -1) + ';';
}

exports.updateRatesCourseQueryString = function updateRatesCourseQueryString() {
  return `UPDATE Rates_Course SET Quality_Of_Course=$4, Quality_Of_Instruction=$5, Difficulty=$6, Workload=$7 WHERE NetID=$1 AND Course_Number=$2 AND Year_Semester=$3;`;
}

exports.coursesQueryString = function coursesQueryString() {
  return `select r.NetID, c.Course_Number, c.Department, c.Level, r.Quality_Of_Course, r.Quality_Of_Instruction, r.Difficulty, r.Workload, r.Year_Semester
  from Rates_Course r
  left join Course c on r.Course_Number = c.Course_Number
  where r.NetID = $1;`
}

exports.courseTableSearchQueryString = function courseTableSearchQueryString() {
  return "SELECT * FROM Course WHERE Department LIKE $1 OR Level LIKE $1;"
}

exports.studentTableSearchQueryString = function studentTableSearchQueryString() {
  return `SELECT * FROM Student WHERE Name LIKE \'%$1%\';`
}

exports.courseAvgQueryString = function courseAvgQueryString() {
  return `select avg(Quality_Of_Course) as avgQualityRating,
  avg(Quality_Of_Instruction) as avgInstructionRating,
  avg(Difficulty) as avgDifficulty,
  avg(WorkLoad) as avgWorkload FROM
  Rates_Course WHERE Course_Number=$1;`
}

exports.courseInfoQueryString = function courseInfoQueryString() {
  return `SELECT * FROM Course WHERE Course_Number=$1;`
}

exports.professorSearchQueryString = function professorSearchQueryString() {
  return `SELECT * FROM Professor WHERE Name LIKE \'%$1%\';`
}

exports.professorInfoQueryString = function professorInfoQueryString() {
  return `SELECT * FROM Professor, Teaches_Course, Course
  WHERE Professor.NetID=$1 AND
  Professor.NetID=Teaches_Course.Professor_NetID AND
  Course.Course_Number=Teaches_Course.Course_Number;`
}

exports.taQueryString = function taQueryString() {
  return `SELECT * FROM TAs_Course, Course
  WHERE TAs_Course.NetID=$1 AND TAs_Course.Course_Number=Course.Course_Number;`
}

exports.insertTAQueryString = function insertTAQueryString() {
  return `INSERT INTO TAs_Course VALUES ($1, $2, $3);`
}
