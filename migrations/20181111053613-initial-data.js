"use strict";

exports.up = function(r, conn) {
  return Promise.all([
    r
      .tableCreate("users")
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      })
  ]).then(() =>
    Promise.all([
      r
        .table("users")
        .indexCreate("username", r.row("username"))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table("users")
        .indexCreate("email", r.row("email"))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        })
    ]).catch(err => {
      console.log(err);
      throw err;
    })
  );
};

exports.down = function(r, conn) {
  return Promise.all([
    r
      .tableDrop("user")
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      })
  ]).catch(err => {
    console.log(err);
    throw err;
  });
};
