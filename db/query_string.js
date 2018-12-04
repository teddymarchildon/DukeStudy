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
  result = string.trim().slice(0, -1);
  string += ` WHERE netid=\'${data['netid']}\';`
  return string;
}

exports.createSelectQueryString = function createSelectQueryStringFromData(netid) {
  return `SELECT * FROM
  Student INNER JOIN Course ON Student.Favorite_Class=Course.Course_Number
  WHERE NetID=\'${netid.trim()}\';`
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
