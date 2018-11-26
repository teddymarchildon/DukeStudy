const express = require('express')
const next = require('next')
const dbHelper = require('./db/query_string.js');
const config = require('./db/config.js')
const { Pool } = require('pg')
var bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const router = express.Router();


app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));

  /**
  initialize the DB
  */

  const pool = new Pool(config.config)

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
    return submitQueryString(pool, res, queryString, true);
  });

  /**
    API for selecting Groups information for a User
  */

  server.get('/api/v1/groups/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting Group data for netid: ' + netid);

    let queryString = dbHelper.groupsPageQueryString(netid);
    return submitQueryString(pool, res, queryString, true);
  });

  /**
    API for getting the department data with a course drop down
  */

  server.get('/api/v1/dropdown/department', (req, res, next) => {
    console.log('Selecting data to populate the Course Drop Down');

    let queryString = dbHelper.dropDownDepartmentQueryString();
    return submitQueryString(pool, res, queryString, true);
  });

  /**
    API for getting the course data with a course drop down
  */

  server.get('/api/v1/dropdown/course/:department', (req, res, next) => {
    const department = req.params.department;
    console.log('Selecting courses within dept: ' + department);

    let queryString = dbHelper.dropDownCourseQueryString(department);
    return submitQueryString(pool, res, queryString, true);
  });

  /**
    Selecting all users for dropdown
  */

  server.get('/api/v1/dropdown/user/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting all users for dropdown');

    let queryString = dbHelper.allUsersQueryString(netid);
    return submitQueryString(pool, res, queryString, true);
  });

  /**
    API For fetching tutoring information
  */

  server.get('/api/v1/tutoring/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting tutoring information for: ' + netid);

    let queryString = dbHelper.selectTutoringQueryString(netid);
    return submitQueryString(pool, res, queryString, true);
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
    return submitQueryString(pool, queryString, false);
  });

  /**
  API for updating User Info
  */

  server.post('/api/v1/student/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Student **')

    let queryString = dbHelper.createUpdateStudentQueryString(req.body);
    return submitQueryString(pool, res, queryString, false);
  });

  /**
  API for registering as a tutor
  */

  server.post('/api/v1/tutor/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Tutor **')
    console.log(req.body)

    let queryString = dbHelper.insertTutorQueryString(req.body);
    return submitQueryString(pool, res, queryString, false);
  });

  /**
    API for registering as a TA
  */

  server.post('/api/v1/ta/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for TA **')
    console.log(req.body)
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
    const year = 'Fall 2018';
    let studyGroupQueryString = dbHelper.insertStudyGroupQueryString(groupID, course, year);
    let result = submitQueryString(pool, res, studyGroupQueryString, false);

    const users = req.body.users.split(",");
    for (user in users) {
      let inStudyGroupQueryString = dbHelper.insertInStudyGroupQueryString(groupID, users[user])
      let result = submitQueryString(pool, res, inStudyGroupQueryString, false);
    }
    return;
  });

  /**
  API for adding a user to a study group
  */

  server.post('/api/v1/inStudyGroup/post', (req, res, next) => {
    //We need to be sure we have the GroupID here
    console.log('** RECEIVED POST REQUEST for adding to a study group **')
    console.log(req.body);


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

submitQueryString = function(pool, res, queryString, shouldSend) {
  console.log('Submitting query: ' + queryString);
  pool.query(queryString, (dberr, dbres) => {
    if (dberr != null) {
      console.error(dberr);
      return null;
    }
    console.log('results: ', dbres.rows);
    if (shouldSend) {
      return res.json(dbres.rows);
    }
    return;
  });
}

generateGroupID = function() {
  let max = 9999;
  let min = 1;
  return Math.floor(Math.random() * (max-min) + min);
}
