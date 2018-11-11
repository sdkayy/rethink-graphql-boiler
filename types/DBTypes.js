/* @flow */
export type DBUser = {
  id: string,
  username: string,
  email: string,
  isAdmin: boolean,
  isBanned: boolean
};

export type RegisterInput = {
  input: {
    username: string,
    password: string,
    email: string
  }
};

export type LoginInput = {
  input: {
    username?: string,
    password: string,
    email?: string
  }
};

export type PossibleInputs = {
  SECRET: string,
  user: string
};

export type UserInput = {
  input: {
    id?: string,
    username?: string,
    email?: string
  }
};
