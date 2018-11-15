exports.createUpdateStudentQueryString = function createStudentInsertQueryStringFromData(data) {
  return `UPDATE student SET primary_major=\'${data['major']}\', primary_minor=\'${data['minor']}\', certificate=\'${data['cert']}\', favorite_class=\'${data['favClass']}\', favorite_professor=\'${data['favProf']}\' WHERE netid=\'${data['netid']}\';`
}

exports.createSelectQueryString = function createSelectQueryStringFromData(netid) {
  return 'SELECT * FROM Student WHERE NetID=\'' + netid + '\';';
}

exports.createNewUserQueryString = function createNewUserQueryString(netid, name) {
  return `INSERT INTO Student VALUES (\'${netid}\', \'${name}\');`;
}

exports.selectCourseQueryString = function createSelectCourseQueryString(courseNumber) {
  return `SELECT * FROM Course WHERE Course_Number=\'${courseNumber}\';`
}
