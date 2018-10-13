const express = require('express')
const next = require('next')
const dbHelper = require('./db/query_string.js');
const config = require('./db/config.js')
const { Client } = require('pg')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const router = express.Router();

app.prepare().then(() => {
  const server = express();

  /**
  API for inserting a new user after sign up
  */

  server.get('/api/v1/insert/:netid', (req, res, next) => {
    const netid = req.params.netid;
    console.log('Creating new entry for user: ' + netid);
    // TODO: access Duke api to get name, major
    let queryString = dbHelper.createNewUserQueryString(netid, 'test');
    return submitQueryString(res, queryString);
  });

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
