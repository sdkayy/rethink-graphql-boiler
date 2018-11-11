export default `
  type User {
    id: ID
    username: String
    password: String
    email: String
    isBanned: Boolean
    isAdmin: Boolean
  }

  input UserInput {
    id: ID
    username: String
    email: String
  }

  input RegisterInput {
    username: String
    password: String
    email: String
  }

  input LoginInput {
    username: String
    password: String
    email: String
  }

  extend type Mutation {
    login(input: LoginInput!): String
    register(input: RegisterInput!): Boolean
  }

  extend type Query {
    user(input: UserInput!): User
  }
`;
