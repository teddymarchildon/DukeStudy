exports.createInsertQueryString = function createInsertQueryStringFromData(netid, table) {
  let queryString = 'INSERT INTO ' + table + getValuesForTable(table, data);
  return queryString;
}

exports.createSelectQueryString = function createSelectQueryStringFromData(netid) {
  return 'SELECT * FROM Student WHERE NetID=\'' + netid + '\';';
}

exports.createNewUserQueryString = function createNewUserQueryString(netid, name) {
  return `INSERT INTO Student VALUES (\'${netid}\', \'${name}\');`;
}

function getValuesForTable(table, data) {
  return valueString = ' values($1, $2)', [
    'teddy',
    'test'
  ];
  // if (table === 'Course') {
  //   let valueString = ' values($1, $2, $3, $4, $5)', [
  //    data.course_Number,
  //    data.Department,
  //    data.Level,
  //    data.Prerequesites,
  //    data.When_Class_Meets];
  //    return valueString;
  // } else if (table === 'Student') {
  //   let valueString = ' values($1, $2, $3, $4, $5, $6, $7, $8)', [
  //    data.Name,
  //    data.GPA,
  //    data.Favorite_Class,
  //    data.Favorite_Professor,
  //    data.Primary_Major,
  //    data.Primary_Minor,
  //    data.Certificate];
  //    return valueString;
  // }
}
