# Therapist Booking Project - GraphQL and TypeScript

This repository contains a Therapist Booking Project built using GraphQL and TypeScript. The project aims to create a platform where users can book appointments with therapists for counseling sessions.

## Features

- User authentication and authorization
- Search for available therapists and their specialties
- Schedule and manage therapy appointments
- View upcoming and past appointments
- Rate and review therapists based on their services


## Demo 

Register users
[! Demo](./screenshots/register.png)

Login users
[! Demo](./screenshots/login.png)


Create review (Auth required)
[! Demo](./screenshots/createReview.png)

Find all review
[! Demo](./screenshots/findAllReview.png)

User details
[! Demo](./screenshots/me.png)

Find all users (Admin role required)
[! Demo](./screenshots/findAllUsers.png)

Create therapist by admin (Admin role required)
[! Demo](./screenshots/register.png)

Therapist count 
[! Demo](./screenshots/therapistCount.png)

Find therapist by location
[! Demo](./screenshots/findTherapistByLocation.png.png)

Get all therapist appoinemnt (therapist role required)
[! Demo](./screenshots/findTherapistAppoinment.png)


Change Appoinemnt status by therapist
[! Demo](./screenshots/TherapistchangeStatus.png)


## Getting Started

**Prerequisites**

Before running this project, make sure you have the following prerequisites installed on your system:

- Node.js (https://nodejs.org)
- npm (Node Package Manager) or yarn (https://yarnpkg.com)

**Installation**

Clone this repository to your local machine using:

```bash
git clone https://github.com/BaseMax/TherapistBookingGraphQLTS.git
```

Navigate to the project directory:

```bash
cd TherapistBookingGraphQLTS
```

Install the project dependencies:
Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Init Prisma : 

```
npx prisma migrate dev --name init 

```


**Configuration**

Create a `.env` file in the root directory and add the following environment variables:
```
# Set enviornment variable :
DATABASE_URL="postgresql://username:password@localhost:5432/your-database?schema=public"
```


Configure any other necessary environment variables based on your specific setup.

## Usage

To start the development server, run the following command:

Using npm:

```bash
npm run start:dev
```

Or using yarn:

```bash
yarn dev
```

The server should now be running on `http://localhost:3000` (or the port you specified in the .env file). You can access the GraphQL Playground to interact with the API and test various queries and mutations.

## GraphQL API

The GraphQL API provides the following endpoints:

- `POST /graphql`: The main endpoint for executing GraphQL queries and mutations.

You can explore the available schema and operations using the GraphQL Playground available at the server's root URL.

## GraphQL

### GetTherapists: Fetch a list of therapists based on specified filters.

```graphql
query GetTherapists($specialty: String, $location: String, $available: Boolean) {
  therapists(specialty: $specialty, location: $location, available: $available) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistById: Get details of a specific therapist by their ID.

```graphql
query GetTherapistById($therapistId: ID!) {
  therapist(id: $therapistId) {
    id
    name
    specialty
    location
    available
    reviews {
      id
      rating
      comment
    }
  }
}
```

### GetAppointments: Fetch a list of appointments for the authenticated user.

```graphql
query GetAppointments {
  appointments {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### GetTherapistSpecialties: Fetch a list of all available therapist specialties.

```graphql
query GetTherapistSpecialties {
  therapistSpecialties {
    id
    name
  }
}
```

### GetUser: Get the details of the authenticated user.

```graphql
query GetUser {
  me {
    id
    name
    email
  }
}
```

### GetTherapistReviews: Get reviews for a specific therapist.

```graphql
query GetTherapistReviews($therapistId: ID!) {
  therapistReviews(therapistId: $therapistId) {
    id
    rating
    comment
    user {
      id
      name
    }
  }
}
```

### GetAvailableAppointments: Fetch a list of available appointments for a specific therapist within a given date range.

```graphql
query GetAvailableAppointments($therapistId: ID!, $startDate: String!, $endDate: String!) {
  availableAppointments(therapistId: $therapistId, startDate: $startDate, endDate: $endDate) {
    id
    therapist {
      id
      name
    }
    date
  }
}
```

### GetUserAppointments: Fetch a list of appointments for a specific user within a given date range.

```graphql
query GetUserAppointments($startDate: String!, $endDate: String!) {
  userAppointments(startDate: $startDate, endDate: $endDate) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### GetTherapistAvailabilities: Fetch a therapist's weekly schedule and availability.

```graphql
query GetTherapistAvailabilities($therapistId: ID!) {
  therapistAvailabilities(therapistId: $therapistId) {
    dayOfWeek
    startTime
    endTime
  }
}
```

### GetTherapistsByLocation: Fetch therapists within a certain radius of a specified location.

```graphql
query GetTherapistsByLocation($location: String!, $radius: Float!) {
  therapistsByLocation(location: $location, radius: $radius) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetUpcomingAppointments: Fetch upcoming appointments for the authenticated user.

```graphql
query GetUpcomingAppointments {
  upcomingAppointments {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### GetPastAppointments: Fetch past appointments for the authenticated user.

```graphql
query GetPastAppointments {
  pastAppointments {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### GetTherapistsBySpecialty: Fetch therapists specializing in a specific therapy category.

```graphql
query GetTherapistsBySpecialty($specialty: String!) {
  therapistsBySpecialty(specialty: $specialty) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistCount: Get the total number of registered therapists.

```graphql
query GetTherapistCount {
  therapistCount
}
```

### GetUserReviews: Fetch reviews given by the authenticated user to therapists.

```graphql
query GetUserReviews {
  userReviews {
    id
    therapist {
      id
      name
    }
    rating
    comment
  }
}
```

### GetUserRatings: Get the average rating and the total number of reviews given by the authenticated user.

```graphql
query GetUserRatings {
  userRatings {
    averageRating
    totalReviews
  }
}
```

### GetTherapistRating: Get the average rating and the total number of reviews for a specific therapist.

```graphql
query GetTherapistRating($therapistId: ID!) {
  therapistRating(therapistId: $therapistId) {
    averageRating
    totalReviews
  }
}
```

### GetUserBookedTherapists: Fetch a list of therapists booked by the authenticated user.

```graphql
query GetUserBookedTherapists {
  userBookedTherapists {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistAvailability: Fetch the availability of a specific therapist for a given date.

```graphql
query GetTherapistAvailability($therapistId: ID!, $date: String!) {
  therapistAvailability(therapistId: $therapistId, date: $date) {
    available
    startTime
    endTime
  }
}
```

### GetUserUpcomingTherapists: Fetch a list of therapists for whom the authenticated user has upcoming appointments.

```graphql
query GetUserUpcomingTherapists {
  userUpcomingTherapists {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistSchedules: Fetch the weekly schedules of multiple therapists.

```graphql
query GetTherapistSchedules($therapistIds: [ID!]!, $startDate: String!, $endDate: String!) {
  therapistSchedules(therapistIds: $therapistIds, startDate: $startDate, endDate: $endDate) {
    therapist {
      id
      name
    }
    schedule {
      dayOfWeek
      startTime
      endTime
    }
  }
}
```

### GetUserReviewsByRating: Fetch reviews given by the authenticated user based on the specified rating.

```graphql
query GetUserReviewsByRating($rating: Int!) {
  userReviewsByRating(rating: $rating) {
    id
    therapist {
      id
      name
    }
    rating
    comment
  }
}
```

### GetTherapistsByLanguage: Fetch therapists who offer counseling in a specific language.

```graphql
query GetTherapistsByLanguage($language: String!) {
  therapistsByLanguage(language: $language) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistRatingsInRange: Fetch therapists whose average ratings fall within a specified range.

```graphql
query GetTherapistRatingsInRange($minRating: Float!, $maxRating: Float!) {
  therapistsByRatingRange(minRating: $minRating, maxRating: $maxRating) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetUserTherapistsBySpecialty: Fetch therapists in a specific specialty who were booked by the authenticated user.

```graphql
query GetUserTherapistsBySpecialty($specialty: String!) {
  userTherapistsBySpecialty(specialty: $specialty) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistBookedDates: Fetch the dates on which a specific therapist is booked.

```graphql
query GetTherapistBookedDates($therapistId: ID!) {
  therapistBookedDates(therapistId: $therapistId) {
    date
  }
}
```

### GetUserTherapistsByLocation: Fetch therapists within a certain radius of the authenticated user's location.

```graphql
query GetUserTherapistsByLocation($radius: Float!) {
  userTherapistsByLocation(radius: $radius) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistByLocationAndSpecialty: Fetch therapists within a certain radius of a specified location and offering a specific specialty.

```graphql
query GetTherapistByLocationAndSpecialty($location: String!, $radius: Float!, $specialty: String!) {
  therapistsByLocationAndSpecialty(location: $location, radius: $radius, specialty: $specialty) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetUserTherapistsWithUpcomingAvailability: Fetch therapists who have upcoming available slots within a specified date range, and whom the authenticated user has not booked.

```graphql
query GetUserTherapistsWithUpcomingAvailability($startDate: String!, $endDate: String!) {
  userTherapistsWithUpcomingAvailability(startDate: $startDate, endDate: $endDate) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistAppointmentsByStatus: Fetch appointments for a specific therapist filtered by status.

```graphql
query GetTherapistAppointmentsByStatus($therapistId: ID!, $status: AppointmentStatus!) {
  therapistAppointmentsByStatus(therapistId: $therapistId, status: $status) {
    id
    date
    status
    user {
      id
      name
    }
  }
}
```

### GetTherapistsByReviewRating: Fetch therapists based on their average review rating falling within a specified range.

```graphql
query GetTherapistsByReviewRating($minRating: Float!, $maxRating: Float!) {
  therapistsByReviewRating(minRating: $minRating, maxRating: $maxRating) {
    id
    name
    specialty
    location
    available
  }
}
```

### GetUserFavoriteTherapists: Fetch a list of therapists marked as favorites by the authenticated user.

```graphql
query GetUserFavoriteTherapists {
  userFavoriteTherapists {
    id
    name
    specialty
    location
    available
  }
}
```

### GetTherapistsByYearsOfExperience: Fetch therapists with a minimum number of years of experience.

```graphql
query GetTherapistsByYearsOfExperience($minExperience: Int!) {
  therapistsByYearsOfExperience(minExperience: $minExperience) {
    id
    name
    specialty
    location
    available
    yearsOfExperience
  }
}
```

### GetUserTherapistAvailability: Fetch a list of therapists available at a specific date and time.

```graphql
query GetUserTherapistAvailability($date: String!, $time: String!) {
  userTherapistAvailability(date: $date, time: $time) {
    id
    name
    specialty
    location
    available
  }
}
```

## GraphQL Mutations

### UpdateUserProfile: Update the details of the authenticated user (e.g., name, email, password).

```graphql
mutation UpdateUserProfile($input: UserProfileInput!) {
  updateUserProfile(input: $input) {
    id
    name
    email
  }
}
```

### DeleteUser: Delete the authenticated user's account.

```graphql
mutation DeleteUser {
  deleteUser
}
```

### CreateTherapist: Add a new therapist to the platform (for admin users).

```graphql
mutation CreateTherapist($input: TherapistInput!) {
  createTherapist(input: $input) {
    id
    name
    specialty
    location
    available
  }
}
```

### UpdateTherapist: Update the details of a therapist (for admin users).

```graphql
mutation UpdateTherapist($therapistId: ID!, $input: TherapistInput!) {
  updateTherapist(id: $therapistId, input: $input) {
    id
    name
    specialty
    location
    available
  }
}
```

### DeleteTherapist: Remove a therapist from the platform (for admin users).

```graphql
mutation DeleteTherapist($therapistId: ID!) {
  deleteTherapist(id: $therapistId)
}
```

### ApproveAppointment: Approve a pending appointment request (for therapists or admin users).

```graphql
mutation ApproveAppointment($appointmentId: ID!) {
  approveAppointment(id: $appointmentId) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### RejectAppointment: Reject a pending appointment request (for therapists or admin users).

```graphql
mutation RejectAppointment($appointmentId: ID!, $reason: String!) {
  rejectAppointment(id: $appointmentId, reason: $reason) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### AddTherapistToFavorites: Add a therapist to the authenticated user's list of favorite therapists.

```graphql
mutation AddTherapistToFavorites($therapistId: ID!) {
  addTherapistToFavorites(therapistId: $therapistId) {
    id
    name
    specialty
    location
    available
  }
}
```

### RemoveTherapistFromFavorites: Remove a therapist from the authenticated user's list of favorite therapists.

```graphql
mutation RemoveTherapistFromFavorites($therapistId: ID!) {
  removeTherapistFromFavorites(therapistId: $therapistId) {
    id
    name
    specialty
    location
    available
  }
}
```

### CreateTherapistReview: Create a new review for a therapist by the authenticated user.

```graphql
mutation CreateTherapistReview($therapistId: ID!, $rating: Int!, $comment: String) {
  createTherapistReview(therapistId: $therapistId, rating: $rating, comment: $comment) {
    id
    rating
    comment
    user {
      id
      name
    }
  }
}
```

### UpdateTherapistReview: Update an existing review given by the authenticated user to a therapist.

```graphql
mutation UpdateTherapistReview($reviewId: ID!, $rating: Int!, $comment: String) {
  updateTherapistReview(id: $reviewId, rating: $rating, comment: $comment) {
    id
    rating
    comment
    user {
      id
      name
    }
  }
}
```

### DeleteTherapistReview: Delete a review given by the authenticated user to a therapist.

```graphql
mutation DeleteTherapistReview($reviewId: ID!) {
  deleteTherapistReview(id: $reviewId)
}
```

### CreateTherapistAvailability: Add availability slots for a therapist's weekly schedule.

```graphql
mutation CreateTherapistAvailability($therapistId: ID!, $availability: [AvailabilityInput!]!) {
  createTherapistAvailability(therapistId: $therapistId, availability: $availability) {
    id
    dayOfWeek
    startTime
    endTime
  }
}
```

### UpdateTherapistAvailability: Update availability slots for a therapist's weekly schedule.

```graphql
mutation UpdateTherapistAvailability($availabilityId: ID!, $startTime: String!, $endTime: String!) {
  updateTherapistAvailability(id: $availabilityId, startTime: $startTime, endTime: $endTime) {
    id
    dayOfWeek
    startTime
    endTime
  }
}
```

### DeleteTherapistAvailability: Remove availability slots from a therapist's weekly schedule.

```graphql
mutation DeleteTherapistAvailability($availabilityId: ID!) {
  deleteTherapistAvailability(id: $availabilityId)
}
```

### CreateTherapistSpecialty: Add a new specialty to the therapist's list of expertise.

```graphql
mutation CreateTherapistSpecialty($name: String!) {
  createTherapistSpecialty(name: $name) {
    id
    name
  }
}
```

### UpdateTherapistSpecialty: Update the name of a therapist's specialty.

```graphql
mutation UpdateTherapistSpecialty($specialtyId: ID!, $name: String!) {
  updateTherapistSpecialty(id: $specialtyId, name: $name) {
    id
    name
  }
}
```

### DeleteTherapistSpecialty: Remove a specialty from the therapist's list of expertise.

```graphql
mutation DeleteTherapistSpecialty($specialtyId: ID!) {
  deleteTherapistSpecialty(id: $specialtyId)
}
```

### CreateAppointmentRequest: Request a therapy appointment with a specific therapist. This mutation allows users to request a booking, which the therapist can then approve or reject.

```graphql
mutation CreateAppointmentRequest($therapistId: ID!, $date: String!) {
  createAppointmentRequest(therapistId: $therapistId, date: $date) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### UpdateAppointmentRequest: Update an existing appointment request. This mutation allows users to reschedule or modify the details of their pending appointment request.

```graphql
mutation UpdateAppointmentRequest($requestId: ID!, $date: String!) {
  updateAppointmentRequest(id: $requestId, date: $date) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### CancelAppointmentRequest: Cancel a pending appointment request. This mutation allows users to cancel an appointment request before it is approved or rejected by the therapist.

```graphql
mutation CancelAppointmentRequest($requestId: ID!) {
  cancelAppointmentRequest(id: $requestId) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### ApproveAppointmentRequest: Approve a pending appointment request as a therapist. This mutation allows therapists to accept a user's appointment request and schedule the session.

```graphql
mutation ApproveAppointmentRequest($requestId: ID!) {
  approveAppointmentRequest(id: $requestId) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### RejectAppointmentRequest: Reject a pending appointment request as a therapist. This mutation allows therapists to decline a user's appointment request, providing an optional reason for the rejection.

```graphql
mutation RejectAppointmentRequest($requestId: ID!, $reason: String) {
  rejectAppointmentRequest(id: $requestId, reason: $reason) {
    id
    therapist {
      id
      name
    }
    date
    status
  }
}
```

### UpdateTherapistStatus: Update the availability status of a therapist. This mutation allows therapists to mark their availability as "available" or "unavailable."

```graphql
mutation UpdateTherapistStatus($available: Boolean!) {
  updateTherapistStatus(available: $available) {
    id
    name
    specialty
    location
    available
  }
}
```

### UpdateTherapistDetails: Update various details of a therapist's profile, such as their name, location, or years of experience.

```graphql
mutation UpdateTherapistDetails($input: TherapistInput!) {
  updateTherapistDetails(input: $input) {
    id
    name
    specialty
    location
    available
  }
}
```

### CreateTherapistProfile: Create a new therapist profile. This mutation is used by therapists to join the platform and provide their information.

```graphql
mutation CreateTherapistProfile($input: TherapistInput!) {
  createTherapistProfile(input: $input) {
    id
    name
    specialty
    location
    available
  }
}
```

### DeleteTherapistProfile: Delete a therapist's profile. This mutation allows therapists to leave the platform and remove their profile and associated data.

```graphql
mutation DeleteTherapistProfile {
  deleteTherapistProfile
}
```

## Contributing

Contributions to this project are welcome! If you find any issues or want to add new features, please follow the standard GitHub workflow:

- Fork the repository.
- Create a new branch with a descriptive name.
- Commit your changes and push the branch to your fork.
- Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License. Feel free to use and modify the code as per the terms of the license.

Copyright 2023, Max Base
