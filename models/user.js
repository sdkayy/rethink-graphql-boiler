/* @flow */
import { db } from "../db";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { DBUser } from "../types/DBTypes";

export const getUserByUsername = (username: string): Promise<DBUser> => {
  return db
    .table("users")
    .getAll(username, { index: "username" })
    .run()
    .then(result => {
      if (result && result.deletedAt) return null;
      return result[0];
    });
};

export const getUserByEmail = (email: string): Promise<DBUser> => {
  return db
    .table("users")
    .getAll(email, { index: "email" })
    .run()
    .then(result => {
      if (result && result.deletedAt) return null;
      return result[0];
    });
};

export const loginUser = async (
  username?: string,
  email?: string,
  password: string
): Promise<?string> => {
  if (username) {
    return db
      .table("users")
      .get(username, { index: "username" })
      .run()
      .then(result => {
        if (result && result.deletedAt) return null;
        if (bcrypt.compare(password, result.password)) {
          return jwt.sign(
            {
              user: _.pick(result, [
                "id",
                "username",
                "email",
                "isAdmin",
                "isBanned"
              ])
            },
            "SECRET",
            {
              expiresIn: "31d"
            }
          );
        }
      });
  } else if (email) {
    return db
      .table("users")
      .get(email, { index: "email" })
      .run()
      .then(result => {
        if (result && result.deletedAt) return null;
        if (bcrypt.compare(password, result.password)) {
          return jwt.sign(
            {
              user: _.pick(result, [
                "id",
                "username",
                "email",
                "isAdmin",
                "isBanned"
              ])
            },
            "SECRET",
            {
              expiresIn: "31d"
            }
          );
        }
      });
  } else {
    return null;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  if (!username || !email || !password) return false;
  return getUserByUsername(username).then(user => {
    console.log(user);
    if (user) return false;
    return getUserByEmail(email).then(eU => {
      console.log(eU);
      if (eU) return false;
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);
      return db
        .table("users")
        .insert(
          {
            createdAt: new Date(),
            username,
            email,
            password: hash,
            isAdmin: false,
            isBanned: false
          },
          { returnChanges: true }
        )
        .run()
        .then(result => result.changes[0].new_val)
        .then(user => {
          if (user) return true;
          else return false;
        });
    });
  });
};
