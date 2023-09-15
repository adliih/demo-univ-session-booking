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
	- [Prisma Studio](#prisma-studio)
	- [Authentication](#authentication)
	- [GraphQL Types](#graphql-types)
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
	- [Insomnia Document](#insomnia-document)

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

## Prisma Studio
Prisma studio is a tool to see your data that were used by prisma. To see it, follow these steps:

1. Run prisma studio
    ```bash
    yarn rw prisma studio
    ```
2. Prisma Studio is accessible at http://localhost:5555/

## Authentication

For authentication, use the provided mutation for login to retrieve the bearer token. This token is required for accessing protected endpoints.

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

After that you can add additional headers, we need to have both `Auth-Provider: jwt` and `Authorization` header to make it works
```txt
Auth-Provider: jwt
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwic3ViIjoiMiIsInJvbGVzIjpbInN0dWRlbnQiXSwiaWF0IjoxNjk0NjgzMjI1LCJleHAiOjE2OTQ2OTA0MjV9.qgo12-D4ouoa5ZDK0_ge8Gmx9Sxegbe0yUYDl6djJIo
```

## GraphQL Types
To use the generated graphql types, please follow these steps:
1. Generate the types
    ```bash
    yarn rw g types
    ```
2. Import the types from `types/graphql`
    ```ts
    import type { MutationResolvers, QueryResolvers } from 'types/graphql'

    export const availableSessions: QueryResolvers['availableSessions'] = () => {}
    ```


## GraphQL Queries

### Session Listing

#### Query
```graphql
query sessions($startDate: Date!, $endDate: Date!) {
  sessions(endDate: $endDate, startDate: $startDate) {
    title
    date
    time
    status
	  id
    studentUserId
    studentUser{id name universityUserId}
		deanUser {id name universityUserId}
		deanUserId
  }
}
```

#### Variables
```json
{
	"startDate": "2023-09-11",
	"endDate": "2023-09-18"
}
```

#### Response
```json
{
	"data": {
		"sessions": [
			{
				"title": null,
				"date": "2023-09-14",
				"time": "10:00",
				"status": "booked",
				"id": 2,
				"deanUserId": 3,
				"studentUserId": 2,
				"deanUser": {
					"id": 3,
					"name": null,
					"universityUserId": "dean-a"
				},
				"studentUser": {
					"id": 2,
					"name": null,
					"universityUserId": "student-a"
				}
			},
			{
				"title": null,
				"date": "2023-09-14",
				"time": "10:00",
				"status": "free",
				"id": null,
				"deanUserId": 4,
				"studentUserId": null,
				"studentUser": null,
				"deanUser": {
					"id": 4,
					"name": null,
					"universityUserId": "dean-b"
				}
			},
			{
				"title": null,
				"date": "2023-09-15",
				"time": "10:00",
				"status": "booked",
				"id": 3,
				"deanUserId": 3,
				"studentUserId": null,
				"studentUser": null,
				"deanUser": {
					"id": 3,
					"name": null,
					"universityUserId": "dean-a"
				}
			},
			{
				"title": null,
				"date": "2023-09-15",
				"time": "10:00",
				"status": "free",
				"id": null,
				"deanUserId": 4,
				"studentUserId": null,
				"studentUser": null,
				"deanUser": {
					"id": 4,
					"name": null,
					"universityUserId": "dean-b"
				}
			}
		]
	},
	"extensions": {}
}
```

### Session Booking

#### Mutation
```graphql
mutation bookSession($date: Date!, $time:String!, $deanUserId: Int!) {
  bookSession(date: $date, time: $time, deanUserId: $deanUserId) {
    date
    id
    status
    time
    title
  }
}
```

#### Variables
```json
{
	"date": "2023-09-14",
	"time": "10:00",
	"deanUserId": 3
}
```

#### Response
```json
{
	"data": {
		"bookSession": {
			"date": "2023-09-14",
			"id": 2,
			"status": "booked",
			"time": "10:00",
			"title": null
		}
	},
	"extensions": {}
}
```

## Usage

1. Start the Redwood.js server:
   ```bash
   yarn rw dev
   ```

2. Make GraphQL queries and mutations using your preferred client, ensuring authentication headers are included for protected routes.

## Insomnia Document

The sample of this API Doc can be found on [insomnia.json](insomnia.json). You can download the app [here](https://insomnia.rest/)