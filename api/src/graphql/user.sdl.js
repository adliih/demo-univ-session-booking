export const schema = gql`
  type User {
    id: Int!
    name: String
    universityUserId: String!
    roles: [String]!
  }
`
