/* @flow */
import type { RegisterInput, PossibleInputs } from "../../../types/DBTypes";
import { registerUser } from "../../../models/user";

export default async (
  parent: *,
  { input }: RegisterInput,
  { SECRET }: PossibleInputs
) => {
  const { username, password, email } = input;
  return registerUser(username, email, password);
};
