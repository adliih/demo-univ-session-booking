export const schema = gql`
  interface Session {
    title: String
    date: Date!
    time: String!
    status: String!
  }

  type BookedSession implements Session {
    id: Int!
    status: String!
  }

  type BookSesionResult {
    success: Boolean!
    session: Session
  }

  type Query {
    availableSessions(startDate: Date!, endDate: Date!): [Session]!
      @requireAuth(roles: ["student", "dean"])
    sessions(startDate: Date!, endDate: Date!): [BookedSession]!
      @requireAuth(roles: ["dean"])
  }

  type Mutation {
    bookSession(date: String!, time: String!): BookSesionResult
      @requireAuth(roles: ["student"])
  }
`
