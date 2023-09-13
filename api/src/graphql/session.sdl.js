export const schema = gql`
  interface Session {
    title: String
    date: Date!
    time: String!
    status: String!
  }

  type AvailableSession implements Session {
    title: String
    date: Date!
    time: String!
    status: String!
  }

  type BookedSession implements Session {
    id: Int!
    title: String
    date: Date!
    time: String!
    status: String!
  }

  type Query {
    availableSessions(startDate: Date!, endDate: Date!): [AvailableSession]!
      @requireAuth(roles: ["student", "dean"])
    sessions(startDate: Date!, endDate: Date!): [Session]!
      @requireAuth(roles: ["dean"])
  }

  type Mutation {
    bookSession(date: Date!, time: String!): BookedSession
      @requireAuth(roles: ["student"])
  }
`
