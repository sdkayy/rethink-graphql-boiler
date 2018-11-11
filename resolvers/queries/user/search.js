/* @flow */
import type { UserInput, PossibleInputs } from "../../../types/DBTypes";
import { getUserByEmail, getUserByUsername } from "../../../models/user";
export default async (
  parent: *,
  { input }: UserInput,
  { user }: PossibleInputs
) => {
  const { id, username, email } = input;
  if (id) console.log("search by id");
  if (username) return getUserByUsername(username);
  if (email) return getUserByEmail(email);
  return null;
};
