const { Pool } = require('pg');
const config = require('./config.js')

const pool = new Pool(config.config);

exports.submitQueryString = function(res, queryString, shouldSend) {
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
