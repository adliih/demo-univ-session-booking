export const schema = gql`
  type AuthResult {
    token: String!
    user: User!
  }

  type Mutation {
    login(universityUserId: String!, password: String!): AuthResult! @skipAuth
  }
`
