import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";
import jwt from "jsonwebtoken";

import typeDefs from "./types";
import resolvers from "./resolvers";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const SECRET = "aslkdjlkaj10830912039jlkoaiuwerasdjflkasd";

const app = express();
const addUser = async req => {
  const token = req.headers.authorization;
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (err) {
    if (err.message === "jwt expired") console.log("got and old token.");
  }
  req.next();
};

app.use(cors("*"));

app.use(addUser);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/api"
  })
);

app.use(
  "/api",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      SECRET,
      user: req.user
    }
  }))
);

app.listen(PORT);
