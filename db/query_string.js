exports.createInsertQueryString = function createInsertQueryStringFromData(data) {
  let netid = data.netid;
  let table = data.table;

  let queryString = 'INSERT INTO ' + table + getValuesForTable(table, data);
  return queryString;
}

exports.createSelectQueryString = function createSelectQueryStringFromData(data) {
  let netid = data.netid;
  let table = data.table;

  return 'SELECT * FROM ' + table + ' WHERE NetID=' + netid;
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
