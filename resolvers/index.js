/* @flow */
import { merge } from "lodash";

// Import Queries
import userQueries from "./queries/user";

// Import Mutations
import userMutations from "./mutations/user";

export default merge(
  {},
  // Queries
  userQueries,
  // Mutations
  userMutations
);
