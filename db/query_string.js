exports.createUpdateStudentQueryString = function createStudentInsertQueryStringFromData(data) {
  return `UPDATE student SET primary_major=\'${data['major']}\', primary_minor=\'${data['minor']}\', certificate=\'${data['cert']}\', favorite_class=\'${data['favClass']}\', favorite_professor=\'${data['favProf']}\' WHERE netid=\'${data['netid']}\';`
}

exports.createSelectQueryString = function createSelectQueryStringFromData(netid) {
  return `SELECT * FROM
  Student INNER JOIN Course ON Student.Favorite_Class=Course.Course_Number
  WHERE NetID=\'${netid}\';`
}

exports.createNewUserQueryString = function createNewUserQueryString(netid, name) {
  return `INSERT INTO Student VALUES (\'${netid}\', \'${name}\');`;
}

exports.groupsPageQueryString = function groupsPageQueryString(netid) {
  return `SELECT * FROM
  In_Study_Group
  INNER JOIN
  Study_Group ON In_Study_Group.Group_ID=Study_Group.Group_ID
  INNER JOIN Course ON Study_Group.Course_Number=Course.Course_Number WHERE In_Study_Group.NetID != \'${netid}\' AND In_Study_Group.Group_ID IN (SELECT Group_ID FROM In_Study_Group WHERE NetID=\'${netid}\');`
}

exports.dropDownDepartmentQueryString = function dropDownDepartmentQueryString() {
  return `SELECT DISTINCT Department FROM Course;`
}

exports.dropDownCourseQueryString = function dropDownCourseQueryString(department) {
  return `SELECT Course_Number, Department, Level FROM Course WHERE
  Department=\'${department}\';`
}
