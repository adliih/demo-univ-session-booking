export const schema = gql`
  type User {
    id: ID!
    name: String
    universityUserId: String!
    roles: Role!
  }
`
