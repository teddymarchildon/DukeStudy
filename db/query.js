const { Pool } = require('pg');
const config = require('./config.js')

const pool = new Pool(config.config);

exports.submitQueryString = function(res, queryString, values = [], shouldSend, callback = null) {
  console.log('Submitting query: ' + queryString);
  pool.query(queryString, values, (dberr, dbres) => {
    if (dberr != null) {
      console.log(dberr);
      return res.json(dberr);
    }
    console.log('results: ', dbres.rows);
    if (shouldSend) {
      return res.json(dbres.rows);
    } else if (callback !== null) {
      callback();
    }
    return;
  });
}
