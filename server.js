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

  server.post('/api/v1/insert/:table', (req, res, next) => {
    const results = [];
    // Grab data from http request
    const table = req.params.table;
    let queryString = dbHelper.createInsertQueryString(table);
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
    const netid = req.params.netid;
    console.log('Selecting data for: ' + netid)
    let queryString = dbHelper.createSelectQueryString(netid);
    const client = new Client(config.config);

    client.connect()

    client.query(queryString, (err, res) => {
      console.log(err, res);
      client.end()
    });
  });

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
