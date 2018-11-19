const express = require('express')
const next = require('next')
const dbHelper = require('./db/query_string.js');
const config = require('./db/config.js')
const { Client } = require('pg')
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

  server.get('/api/v1/select/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting data for: ' + netid)

    let queryString = dbHelper.createSelectQueryString(netid);
    return submitQueryString(res, queryString);
  });

  /**
  API for selecting course information
  */

  server.get('/api/v1/select/course/:course', (req, res, next) => {
    const courseNumber = req.params.course;
    console.log('Selecting Course data for: ' + courseNumber)

    let queryString = dbHelper.selectCourseQueryString(courseNumber);
    return submitQueryString(res, queryString);
  });

  /**
    API for selecting Groups information for a User
  */

  server.get('/api/v1/select/groups/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Selecting Group data for netid: ' + netid)

    let queryString = dbHelper.selectGroupsQueryString(netid);
    console.log("query: " + queryString)
    return submitQueryString(res, queryString)
  });

  /**
    API for selecting Group information by GroupID
  */

  server.get('/api/v1/select/group/:groupid', (req, res, next) => {
    const groupid = req.params.groupid;
    console.log('Selecting Group data for groupid: ' + groupid);

    let queryString = dbHelper.selectGroupQueryString(groupid);
    return submitQueryString(res, queryString);
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
    return submitQueryString(queryString);
  });

  /**
  API for updating User Info
  */

  server.post('/api/v1/student/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Student **')
    let queryString = dbHelper.createUpdateStudentQueryString(req.body)
    console.log(queryString)
    return submitQueryString(res, queryString);
  });

  /**
  API for registering as a tutor
  */

  server.post('/api/v1/tutor/post', (req, res, next) => {
    console.log('** RECEIVED POST REQUEST for Tutor **')
    console.log(req.body)
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
    console.log('** RECEIVED POST REQUEST for creating a new study group **')
    console.log(req.body)

  });

  /**
  API for adding a user to a study group
  */

  server.post('/api/v1/inStudyGroup/post', (req, res, next) => {
    //We need to be sure we have the GroupID here
    console.log('** RECEIVED POST REQUEST for adding to a study group **')
    console.log(req.body)

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

submitQueryString = function(res, queryString) {
  const results = [];
  const client = new Client(config.config);
  client.connect();
  console.log('Submitting query: ' + queryString);
  client.query(queryString, (dberr, dbres) => {
    if (dberr != null) {
      console.error(dberr);
      return null;
    } else {
      results.push(dbres.rows[0]);
    }
    client.end();
    console.log('results: ', results);
    return res.json(results)
  });
}
