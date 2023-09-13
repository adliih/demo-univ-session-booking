export const schema = gql`
  type User {
    id: ID!
    name: String
    universityUserId: String!
    roles: Role!
  }

  type Role {
    id: ID!
    type: String!
  }
`
