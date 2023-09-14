export const schema = gql`
  type Session {
    title: String
    date: Date!
    startTime: String!
    endTime: String!
    status: String!
    id: Int
    studentUser: User
    studentUserId: Int
    deanUser: User
    deanUserId: Int
  }

  type Query {
    sessions(startDate: Date!, endDate: Date!): [Session]! @requireAuth
  }

  type Mutation {
    bookSession(
      date: Date!
      startTime: String!
      endTime: String!
      deanUserId: Int!
    ): Session @requireAuth(roles: ["student"])
  }
`
