# [ONGOING] Climber Connect: Profile and Group Management for Climbers in Spring boot and React

## Description

**Climber Connect** is a full-stack web application that allows users to create and manage climber profiles, register as climbers, and organize climbing activities. Users can store their favorite climbing locations on a map and create climbing groups to organize outings with others. The app is built with Spring Boot on the backend and React on the frontend, providing a seamless experience for both user management and map integration.

## Proof of concepts

### Backend
- **Authentication**: Springboot application secured with Auth0 Jwt and Spring security including roles and privileges.
- **Api**: CRUD API using RestController and DTOS. Jarkata and Passay are used for data validation. Spring security authorities is used for route protection. Pagination using Spring data JPA.

### Frontend
- **Routing**: React application provides secured routes (using React router) based on roles and unsecured ones for sign-in and sign-up.
- **Api**: React query and zod are used for getting and mutate data. Server side pagination is also implemented (shadcn/ui tables).
- **Map**: React leaflet map implementation.

## Technologies Used

### Backend Technologies

- **Spring Boot**: A framework for building production-ready applications with Java.
    - **Spring Boot Starter Web**: To build web applications and RESTful APIs.
    - **Spring Boot Starter Data JPA**: For database interactions using the Java Persistence API (JPA).
    - **Spring Boot Starter Security**: For implementing authentication and authorization mechanisms.
    - **Spring Boot Starter Validation**: For input validation.
- **Hibernate**: Used in conjunction with Spring Data JPA for ORM (Object-Relational Mapping).
- **Jackson Datatype for Hibernate**: Handling JSON serialization and deserialization of Hibernate entities.
- **Java JWT (Auth0)**: For handling JWT-based authentication.
- **Passay**: For enforcing password policies and validations.
- **Lombok**: Used to reduce boilerplate code such as getters, setters, and constructors (optional dependency).
- **DataFaker**: For generating fake data in testing and seeding.
- **Testing**:
    - **Spring Boot Starter Test**: For writing unit and integration tests.
    - **Spring Security Test**: For testing security-related functionality.

#### Build and Dependency Management

- **Maven**: For project build and dependency management.
- **Spring Boot Maven Plugin**: For packaging and running the Spring Boot application.

## Frontend Technologies

- **React**: A JavaScript library for building user interfaces.
    - **React Router DOM**: For client-side routing and navigation.
    - **React Hook Form**: For building and managing forms with validation.
    - **React Query**: For handling server-state management, caching, and data synchronization.
    - **React-Leaflet**: For rendering maps using the Leaflet library.
- **Shadcn UI**: A customizable and accessible component library built on top of Radix UI (and others) and Tailwind CSS.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Leaflet**: A lightweight, open-source library for mobile-friendly interactive maps.
- **Axios**: For making HTTP requests from the frontend to the backend API.
- **Zod**: A schema declaration and validation library.
- **Date-FNS**: For manipulating and formatting dates in JavaScript.

### Development and Build Tools

- **Vite**: A fast build tool for modern web projects, used for both development and production builds.
- **TypeScript**: A statically typed superset of JavaScript for writing safer and more maintainable code.
- **ESLint**: A tool for identifying and fixing problems in your JavaScript and TypeScript code.

## Features

- **Climber Profiles**: Users can create and manage their climber profiles, including details such as skill level, climbing experience, and preferred climbing styles.
- **Locations**: Save favorite climbing spots on an interactive map using.
- **Climbing Groups**: Create and manage climbing groups, invite others to join, and organize group outings.
- **User Authentication**: Secure login and registration system using Spring Security, allowing users to manage their profiles.
- **Interactive Map**: Display and manage favorite climbing locations directly on an interactive map.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/GuillaumeRoussin/spring-boot-react-portfolio.git
   cd spring-boot-react-portfolio
   ```
2. Run Docker compose
    ```bash
   docker-compose up
   ```
3. Run spring application
    ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
4. Run react app
    ```bash
   cd app
   npm install
   npm run dev
    ```
## Default Usage and Users
Go to http://localhost:5173/
List of registered users (you can registered some as well)

| Username          | Password | Role  |
|-------------------|----------|-------|
| admin@test.com    | test     | Admin |
| staff@test.com    | test     | Staff |
| user@test.com     | test     | User  |