export const schema = gql`
  type Session {
    title: String
    date: Date!
    time: String!
    status: String!
    id: Int
    studentUser: User
    studentUserId: Int
  }

  type Query {
    sessions(startDate: Date!, endDate: Date!): [Session]! @requireAuth
  }

  type Mutation {
    bookSession(date: Date!, time: String!): Session
      @requireAuth(roles: ["student"])
  }
`
