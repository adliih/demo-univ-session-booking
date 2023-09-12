# Redwood.js Backend API for Univ Sessions

## Overview

This backend API is built using Redwood.js and GraphQL, providing a flexible foundation for managing student and dean sessions. The system supports multiple types of users, specifically Students and Deans, with distinct permissions for session visibility and booking.

- Students can only view free Dean sessions.
- Deans have the authority to view both free and pending sessions.

Authentication is required for accessing session listings and making bookings. A mutation for login is available to retrieve the bearer token for authenticated requests.

## Table of Contents

- [Redwood.js Backend API for Univ Sessions](#redwoodjs-backend-api-for-univ-sessions)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Authentication](#authentication)
  - [GraphQL Queries](#graphql-queries)
    - [Session Listing](#session-listing)
      - [Query](#query)
      - [Variables](#variables)
      - [Response](#response)
    - [Session Booking](#session-booking)
      - [Mutation](#mutation)
      - [Variables](#variables-1)
      - [Response](#response-1)
  - [Usage](#usage)

## Installation

To set up the Redwood.js backend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/backend-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend-api
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Configure environment variables for authentication and database access.
5. Run the project
   ```bash
   yarn rw dev
   # or run api only
   yarn rw dev api
   ```
6. GraphQL Playground is accessible at http://localhost:8911/graphql

## Authentication

For authentication, use the provided mutation for login to retrieve the bearer token. This token is required for accessing protected endpoints.

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

## GraphQL Queries

### Session Listing

#### Query
```graphql
query ListSessions($status: String, $startDate: Date, $endDate: Date) {
  sessions(status: $status, startDate: $startDate, endDate: $endDate) {
    id
    title
    date
    time
    status
  }
}
```

#### Variables
```json
{
  "status": "free",
  "startDate": "2023-09-15",
  "endDate": "2023-09-16"
}
```
```json

{
  "status": "free",
  "startDate": "2023-09-15",
  "endDate": "2023-09-16"
}
```

#### Response
```json
{
  "data": {
    "sessions": [
      {
        "id": 1,
        "title": "Session Title",
        "date": "2023-09-15",
        "time": "10:00",
        "status": "free"
      },
      {
        "id": 2,
        "title": "Another Session",
        "date": "2023-09-16",
        "time": "11:00",
        "status": "free"
      }
    ]
  }
}
```

### Session Booking

#### Mutation
```graphql
mutation BookSession($sessionId: Int!) {
  bookSession(sessionId: $sessionId) {
    success
    message
  }
}
```

#### Variables
```json
{
  "sessionId": 1
}
```

#### Response
```json
{
  "data": {
    "bookSession": {
      "success": true,
      "message": "Session booked successfully."
    }
  }
}
```

## Usage

1. Start the Redwood.js server:
   ```bash
   yarn rw dev
   ```

2. Make GraphQL queries and mutations using your preferred client, ensuring authentication headers are included for protected routes.