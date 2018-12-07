const express = require('express')
const next = require('next')
const dbHelper = require('./db/query_string.js');
const db = require('./db/query.js');
var bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const router = express.Router();


app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));

  /**
    Here is the API for selecting information to display
  */

  /**
  API for selecting the user data on homepage
  */

  server.get('/api/v1/student/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting data for: ' + netid)

    let queryString = dbHelper.createSelectQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for selecting Groups information for a User
  */

  server.get('/api/v1/groups/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting Group data for netid: ' + netid);

    let queryString = dbHelper.groupsPageQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for getting the department data with a course drop down
  */

  server.get('/api/v1/dropdown/department', (req, res, next) => {
    console.log('Selecting data to populate the Course Drop Down');

    let queryString = dbHelper.dropDownDepartmentQueryString();
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for getting the course data with a course drop down
  */

  server.get('/api/v1/dropdown/course/:department', (req, res, next) => {
    const department = req.params.department;
    console.log('Selecting courses within dept: ' + department);

    let queryString = dbHelper.dropDownCourseQueryString(department);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    Selecting all users for dropdown
  */

  server.get('/api/v1/dropdown/user', (req, res, next) => {
    const netid = req.query.netid;
    const course = req.query.course;
    console.log('Selecting users for dropdown from course: ' + course);

    let queryString = dbHelper.allUsersQueryString(netid, course);
    return db.submitQueryString(res, queryString, true);
  });

  /**
  API for selecting professor data
  */

  server.get('/api/v1/dropdown/professor/', (req, res, next) => {
    console.log('Selecting all professors for dropdown');

    let queryString = dbHelper.allProfessorsQueryString();
    return db.submitQueryString(res, queryString, true);
  });
  /**
    API For fetching tutoring information
  */

  server.get('/api/v1/tutoring/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting tutoring information for: ' + netid);

    let queryString = dbHelper.selectTutoringQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    Hits this API to remove the specified user from the specified group
  */

  server.get('/api/v1/leaveStudyGroup', (req, res, next) => {
    const netid = req.query.netid;
    const groupID = req.query.groupID;
    console.log('Removing user: ' + netid + ' from group: ' + groupID);

    let queryString = dbHelper.removeUserFromGroupQueryString(netid, groupID);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    Flow API
  */
  server.get('/api/v1/flow/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting flow data for: ' + netid);

    let queryString = dbHelper.flowQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for searching a term
  */

  server.get('/api/v1/search', (req, res, next) => {
    var type = req.query.type;
    var term = req.query.term;
    console.log(`Submitting ${type} search for term: ${term}`);
    var queryString;
    if (type=='Course') {
      queryString = dbHelper.courseTableSearchQueryString(term.toUpperCase());
    } else if (type=='Student') {
      queryString = dbHelper.studentTableSearchQueryString(term);
    } else if (type=='Professor') {
      queryString = dbHelper.professorSearchQueryString(term);
    }
    return db.submitQueryString(res, queryString, true);
  });

  /**
  API for getting the courses data
  */

  server.get('/api/v1/courses/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting course data for: ' + netid);

    let queryString = dbHelper.coursesQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for getting the course semesters for a particular course
  */

  server.get('/api/v1/dropdown/semesters/:course', (req, res, next) => {
      const course = req.params.course;
      console.log('Getting semesters for course: ' + course);

      let queryString = dbHelper.courseSemestersQueryString(course);
      return db.submitQueryString(res, queryString, true);
  });

  server.get('/api/v1/course/:courseID', (req, res, next) => {
    const course = req.params.courseID;
    console.log('Getting course info for: ' + course);

    let queryString = dbHelper.courseInfoQueryString(course);
    return db.submitQueryString(res, queryString, true);
  });

  server.get('/api/v1/courseAvg/:courseID', (req, res, next) => {
    const course = req.params.courseID;
    console.log('Getting avg course info for: ' + course);

    let queryString = dbHelper.courseAvgQueryString(course);
    return db.submitQueryString(res, queryString, true);
  });

  server.get('/api/v1/professor/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting Professor data for: ' + netid);

    let queryString = dbHelper.professorInfoQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });

  server.get('/api/v1/TAing/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting TA information for: ' + netid);

    let queryString = dbHelper.taQueryString(netid);
    return db.submitQueryString(res, queryString, true);
  });
  /**
    Below is the updating information API

  */
  /**
  API for inserting a new user after sign up
  */

  server.post('/api/v1/user/post', (req, res, next) => {
    const netid = req.body.netid;
    const name = req.body.name;

    let queryString = dbHelper.createNewUserQueryString(netid, name);
    return db.submitQueryString(res, queryString, false);
  });

  /**
  API for updating User Info
  */

  server.post('/api/v1/takesCourses/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Taking Courses **')
    const netid = req.body.netid;
    const favCourse = req.body.favoriteCourse;
    var queryString = '';
    if (favCourse !== null) {
      queryString = dbHelper.favoriteClassQueryString(netid, favCourse);
      db.submitQueryString(res, queryString, false);
    }

    const courses = JSON.parse(req.body.selectedCourses);
    const semesters = JSON.parse(req.body.selectedCourseSemesters);

    queryString = dbHelper.takesCourseQueryString(netid, courses, semesters);
    let result = db.submitQueryString(res, queryString, false, () => {
      queryString = dbHelper.ratesCourseQueryString(netid, courses, semesters);
      let rateResult = db.submitQueryString(res, queryString, false);
    });

    return res.json({success: true});
  });

  server.post('/api/v1/addCourse/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Adding a Course **')
    console.log(req.body);
    const netid = req.body.netid;
    const favCourse = req.body.favoriteCourse;
    var queryString = '';
    if (favCourse !== null && favCourse==='true') {
      queryString = dbHelper.favoriteClassQueryString(netid, favCourse);
      db.submitQueryString(res, queryString, false);
    }

    const courses = JSON.parse(req.body.course);
    const semesters = JSON.parse(req.body.semester);

    queryString = dbHelper.takesCourseQueryString(netid, courses, semesters);
    let result = db.submitQueryString(res, queryString, false, () => {
      queryString = dbHelper.ratesCourseQueryString(netid, courses, semesters);
      let rateResult = db.submitQueryString(res, queryString, false);
    });

    return res.json({success: true});
  });

  /**
    Takes Courses API
  */

  server.post('/api/v1/student/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Student **')

    let queryString = dbHelper.createUpdateStudentQueryString(req.body);
    return db.submitQueryString(res, queryString, false);
  });

  /**
  API for registering as a tutor
  */

  server.post('/api/v1/tutor/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Tutor **')
    console.log(req.body)

    let queryString = dbHelper.insertTutorQueryString(req.body);
    return db.submitQueryString(res, queryString, false);
  });

  /**
    API for registering as a TA
  */

  server.post('/api/v1/ta/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for TA **')
    console.log(req.body)

    const netid = req.body.netid;
    const courseNumber = req.body.courseNumber;
    const courseSemester = req.body.courseSemester;

    let queryString = dbHelper.insertTAQueryString(netid, courseNumber, courseSemester);
    return db.submitQueryString(res, queryString, true);
  });

  /**
    API for registering that a user takes a course
    one call to the API for each course
  */

  server.post('/api/v1/takesCourse/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Taking course **')
    console.log(req.body)
  });

  /**
    API for rating a course
  */

  server.post('/api/v1/ratesCourse/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for rating course **')
    console.log(req.body)
    const netid = req.body.netid;
    const course = JSON.parse(req.body.course);
    const favorite = req.body.favoriteCourse;

    if (favorite !== null && favorite === 'true') {
      let queryString = dbHelper.favoriteClassQueryString(netid, course.course_number);
      db.submitQueryString(res, queryString, false);
    }

    let queryString = dbHelper.updateRatesCourseQueryString(netid, course);
    return db.submitQueryString(res, queryString, true);
  });

  /**
  API for creating a study group for a particular class
  */

  server.post('/api/v1/studyGroup/post', (req, res, next) => {
    //Here we need to generate a random ID, and be sure to
    //return that ID to the browser
    //The parameter should be the courseID
    console.log('** RECEIVED POST REQUEST for creating a new study group **');
    console.log(req.body);

    const groupID = generateGroupID();
    const course = req.body.courseID;
    const year = req.body.courseSemester;
    let studyGroupQueryString = dbHelper.insertStudyGroupQueryString(groupID, course, year);
    let result = db.submitQueryString(res, studyGroupQueryString, false);
    const users = req.body.users.split(",");
    let inStudyGroupQueryString = dbHelper.insertInStudyGroupQueryString(groupID, users)
    let final = db.submitQueryString(res, inStudyGroupQueryString, false);
    return;
  });

  /**
  Handling all requests
  */
  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

generateGroupID = function() {
  let min = 7661;
  let max = 9999;
  return Math.floor(Math.random() * (max-min) + min);
}
