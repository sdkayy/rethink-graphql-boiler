/* @flow */
/**
 * Database setup is done here
 */
const IS_PROD = !process.env.FORCE_DEV && process.env.IS_PROD;

const DEFAULT_CONFIG = {
  db: "regql",
  max: 500,
  buffer: 5,
  timeoutGb: 60 * 1000
};

const config = DEFAULT_CONFIG;

var r = require("rethinkdbdash")(config);

// Exit the process on unhealthy db in test env
if (process.env.TEST_DB) {
  r.getPoolMaster().on("healthy", healthy => {
    if (!healthy) {
      process.exit(1);
    }
  });
}

if (!IS_PROD && process.env.TRACK_DB_PERF) {
  const fs = require("fs");
  // $FlowFixMe
  const inspect = require("rethinkdb-inspector");
  const queries = [];
  inspect(r, {
    onQueryComplete: (query, { size, time }) => {
      if (query.indexOf(".changes") > -1) return;
      queries.push({ query, time, size });
      fs.writeFileSync(
        "queries-by-time.js",
        JSON.stringify(queries.sort((a, b) => b.time - a.time), null, 2)
      );
      fs.writeFileSync(
        "queries-by-response-size.js",
        JSON.stringify(queries.sort((a, b) => b.size - a.size), null, 2)
      );
    }
  });
}

module.exports = { db: r };
