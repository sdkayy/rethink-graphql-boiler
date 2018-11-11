/* @flow */
import type { LoginInput, PossibleInputs } from "../../../types/DBTypes";
import { loginUser } from "../../../models/user";

export default async (
  parent: *,
  { input }: LoginInput,
  { SECRET }: PossibleInputs
) => {
  const { username, password, email } = input;
  return loginUser(username, email, password);
};
