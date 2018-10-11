const express = require('express')
const next = require('next')
const pg = require('pg');
const path = require('path');
const dbHelper = require('./db/query_string.js');
const config = require('./db/config.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.post('/api/v1/insert/:table', (req, res, next) => {
    const results = [];
    // Grab data from http request
    const data = req.body;
    let queryString = dbHelper.createInsertQueryStringFromData(data);
    // Get a Postgres client from the connection pool
    pg.connect(config, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const query = client.query(queryString);

      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results)
      });
    });
  });

  server.get('/api/v1/select/:netid', (req, res, next) => {
    const results = [];
    const data = req.body;
    let queryString = dbHelper.createSelectQueryStringFromData(data);

    pg.connect(config, (err, client, done) => {
      console.log("** Connecting to DB **")
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const query = client.query(queryString);

      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results)
      });
    });
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
