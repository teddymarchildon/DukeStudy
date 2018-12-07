exports.createUpdateStudentQueryString = function createStudentInsertQueryStringFromData(data) {
  var string = `UPDATE Student SET `;
  if (data['name'] !== null && data['name'] !== 'null') {
    string += `name=\'${data['name']}\',`
  }
  if (data['major'] !== null && data['major'] !== 'null') {
    string += `primary_major=\'${data['major']}\', `
  }
  if (data['minor'] !== null && data['minor'] !== 'null') {
    string += `primary_minor=\'${data['minor']}\', `
  }
  if (data['certificate'] !== null && data['certificate'] !== 'null') {
    string += `certificate=\'${data['certificate']}\', `
  }
  if (data['favClass'] !== null && data['favClass'] !== 'null') {
    string += `favorite_class=\'${data['favClass']}\', `
  }
  if (data['favProf'] !== null && data['favProf'] !== 'null') {
    string += `favorite_professor=\'${data['favProf']}\', `
  }
  var result = string.trim().slice(0, -1);
  result += ` WHERE netid=\'${data['netid']}\';`
  return result;
}

exports.createSelectQueryString = function createSelectQueryStringFromData(netid) {
  // return `SELECT * FROM
  // Student INNER JOIN Course ON Student.Favorite_Class=Course.Course_Number
  // WHERE NetID=\'${netid.trim()}\';`
  // return `select *
  // c.Course_Number, c.Department, c.Level, p.Name
  // from Student s, Professor p, Course c
  // where s.NetID = \'${netid}\'
  // and s.Favorite_Professor = p.NetID
  // and s.Favorite_Class = c.Course_Number;`
  // return `select *
  // from Student s
  // left join Professor p on p.NetID = s.Favorite_Professor
  // left join Course c on s.Favorite_Class = c.Course_Number
  // where s.NetID = \'${netid}\';`
  return `select s.*, p.Name, c.Course_Number, c.Department, c.Level
  from Student s
  left join Professor p on p.NetID = s.Favorite_Professor
  left join Course c on s.Favorite_Class = c.Course_Number
  where s.NetID = \'${netid}\';`

}

exports.createNewUserQueryString = function createNewUserQueryString(netid, name) {
  return `INSERT INTO Student VALUES (\'${netid.trim()}\', \'${name.trim()}\');`;
}

exports.groupsPageQueryString = function groupsPageQueryString(netid) {
  return `SELECT * FROM
  In_Study_Group
  INNER JOIN
  Study_Group ON In_Study_Group.Group_ID=Study_Group.Group_ID
  INNER JOIN Course ON Study_Group.Course_Number=Course.Course_Number WHERE In_Study_Group.NetID != \'${netid.trim()}\' AND In_Study_Group.Group_ID IN (SELECT Group_ID FROM In_Study_Group WHERE NetID=\'${netid.trim()}\');`
}

exports.dropDownDepartmentQueryString = function dropDownDepartmentQueryString() {
  return `SELECT DISTINCT Department FROM Course;`
}

exports.dropDownCourseQueryString = function dropDownCourseQueryString(department) {
  return `SELECT Course_Number, Department, Level FROM Course WHERE
  Department=\'${department.trim()}\';`
}

exports.selectTutoringQueryString = function selectTutoringQueryString(netid) {
  return `SELECT * FROM Tutor WHERE NetID=\'${netid.trim()}\';`
}

exports.insertTutorQueryString = function insertTutorQueryString(data) {
  return `INSERT INTO Tutor VALUES (\'${data['netid']}\', \'${data['rate']}\', \'${data['availability']}\') ON CONFLICT (NetID) DO UPDATE SET Rate_Per_Hour=\'${data['rate']}\', Days_Available=\'${data['availability']}\';`
}

exports.allUsersQueryString = function allUsersQueryString(netid, courseID) {
  return `SELECT Takes_Course.NetID, Name, Course_Number FROM
  Takes_Course INNER JOIN Student ON Takes_Course.NetID=Student.NetID
  WHERE Takes_Course.NetID != \'${netid.trim()}\' AND Course_Number=\'${courseID.trim()}\';`
}

exports.insertStudyGroupQueryString = function insertStudyGroupQueryString(groupID, courseID, year) {
  return `INSERT INTO Study_Group VALUES (${groupID}, \'${courseID.trim()}\', \'${year.trim()}\');`
}

exports.insertInStudyGroupQueryString = function insertInStudyGroupQueryString(groupID, users) {
  var string = 'INSERT INTO In_Study_Group VALUES ';
  for (user in users) {
    string += '(' + groupID + ', \'' + users[user].trim() + '\'),'
  }
  return string.slice(0, -1) + ';';
}

exports.removeUserFromGroupQueryString = function removeUserFromGroupQueryString(netid, groupID) {
  return `DELETE FROM In_Study_Group WHERE Group_ID=\'${groupID}\' AND NetID=\'${netid.trim()}\';`
}

exports.flowQueryString = function flowQueryString(netid) {
  return `SELECT * FROM Student WHERE NetID=\'${netid.trim()}\';`
}

exports.favoriteClassQueryString = function favoriteClassQueryString(netid, courseNumber) {
  return `UPDATE Student SET Favorite_Class=\'${courseNumber.trim()}\' WHERE NetID=\'${netid.trim()}\';`
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

exports.courseSemestersQueryString = function courseSemestersQueryString(course) {
  return `SELECT * FROM Course_Semesters WHERE Course_Number=\'${course}\';`
}

exports.ratesCourseQueryString = function ratesCourseQueryString(netid, courses, semesters) {
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

exports.updateRatesCourseQueryString = function updateRatesCourseQueryString(netid, course) {
  return `UPDATE Rates_Course SET Quality_Of_Course=${course.quality_of_course}, Quality_Of_Instruction=${course.quality_of_instruction}, Difficulty=${course.difficulty}, Workload=${course.workload} WHERE NetID=\'${netid}\' AND Course_Number=\'${course.course_number}\' AND Year_Semester=\'${course.year_semester}\';`;
}

exports.coursesQueryString = function coursesQueryString(netid) {
  return `select r.NetID, c.Course_Number, c.Department, c.Level, r.Quality_Of_Course, r.Quality_Of_Instruction, r.Difficulty, r.Workload, r.Year_Semester
  from Rates_Course r
  left join Course c on r.Course_Number = c.Course_Number
  where r.NetID = \'${netid}\';`
}

exports.courseTableSearchQueryString = function courseTableSearchQueryString(term) {
  return `SELECT * FROM Course WHERE Department LIKE \'%${term}%\' OR Level LIKE \'%${term}%\';`
}

exports.studentTableSearchQueryString = function studentTableSearchQueryString(term) {
  return `SELECT * FROM Student WHERE Name LIKE \'%${term}%\';`
}

exports.courseAvgQueryString = function courseAvgQueryString(courseID) {
  return `select avg(Quality_Of_Course) as avgQualityRating,
  avg(Quality_Of_Instruction) as avgInstructionRating,
  avg(Difficulty) as avgDifficulty,
  avg(WorkLoad) as avgWorkload FROM
  Rates_Course WHERE Course_Number=\'${courseID}\';`
}

exports.courseInfoQueryString = function courseInfoQueryString(courseID) {
  return `SELECT * FROM Course WHERE Course_Number=\'${courseID}\';`
}

exports.professorSearchQueryString = function professorSearchQueryString(term) {
  return `SELECT * FROM Professor WHERE Name LIKE \'%${term}%\';`
}

exports.professorInfoQueryString = function professorInfoQueryString(netid) {
  return `SELECT * FROM Professor, Teaches_Course, Course
  WHERE Professor.NetID=\'${netid}\' AND
  Professor.NetID=Teaches_Course.Professor_NetID AND
  Course.Course_Number=Teaches_Course.Course_Number;`
}

exports.taQueryString = function taQueryString(netid) {
  return `SELECT * FROM TAs_Course, Course
  WHERE TAs_Course.NetID=\'${netid}\' AND TAs_Course.Course_Number=Course.Course_Number;`
}

exports.insertTAQueryString = function insertTAQueryString(netid, courseNumber, courseSemester) {
  return `INSERT INTO TAs_Course VALUES (\'${netid}\', \'${courseNumber}\', \'${courseSemester}\');`
}
