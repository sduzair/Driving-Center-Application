# Driving-Test-Center-Application-Project

![publish docker image workflow status](https://github.com/sduzair/Driving-Test-Center-Application-Project/actions/workflows/publish-docker-image.yml/badge.svg)

![ci workflow status](https://github.com/sduzair/Driving-Test-Center-Application-Project/actions/workflows/ci.yml/badge.svg?branch=main)

- [Driving-Test-Center-Application-Project](#driving-test-center-application-project)
  - [Development](#development)
    - [Formatting and Linting](#formatting-and-linting)
    - [With Docker](#with-docker)
  - [Tech Stack and Architecture](#tech-stack-and-architecture)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Architecture Pattern: MVC (Model-View-Controller)](#architecture-pattern-mvc-model-view-controller)
    - [Additional Patterns and Technologies](#additional-patterns-and-technologies)
    - [Development Tools](#development-tools)
  - [User Personas](#user-personas)
    - [1. Driver Applicant](#1-driver-applicant)
    - [2. Driving Examiner](#2-driving-examiner)
    - [3. System Administrator](#3-system-administrator)
  - [Requirements](#requirements)
    - [User Authentication](#user-authentication)
      - [Feature: User Signup](#feature-user-signup)
        - [Scenario: Successful signup](#scenario-successful-signup)
        - [Scenario: Signup with mismatched passwords](#scenario-signup-with-mismatched-passwords)
        - [Scenario: Signup with existing username](#scenario-signup-with-existing-username)
      - [Feature: User Login](#feature-user-login)
        - [Scenario: Successful login](#scenario-successful-login)
        - [Scenario: Login with invalid credentials](#scenario-login-with-invalid-credentials)
    - [Driver Interface](#driver-interface)
      - [Feature: G2 License Application](#feature-g2-license-application)
        - [Scenario: Submitting G2 application](#scenario-submitting-g2-application)
        - [Scenario: Incomplete G2 application](#scenario-incomplete-g2-application)
      - [Feature: G License Application](#feature-g-license-application)
        - [Scenario: Submitting G application](#scenario-submitting-g-application)
    - [Examiner Interface](#examiner-interface)
      - [Feature: View Scheduled Tests](#feature-view-scheduled-tests)
        - [Scenario: Viewing all scheduled tests](#scenario-viewing-all-scheduled-tests)
        - [Scenario: Filtering tests by type](#scenario-filtering-tests-by-type)
      - [Feature: Conduct Driving Test](#feature-conduct-driving-test)
        - [Scenario: Passing a driver](#scenario-passing-a-driver)
        - [Scenario: Failing a driver](#scenario-failing-a-driver)
    - [Admin Interface](#admin-interface)
      - [Feature: Create Appointment Slots](#feature-create-appointment-slots)
        - [Scenario: Creating a new appointment slot](#scenario-creating-a-new-appointment-slot)
        - [Scenario: Attempting to create a duplicate slot](#scenario-attempting-to-create-a-duplicate-slot)
      - [Feature: View Test Results](#feature-view-test-results)
        - [Scenario: Viewing all test results](#scenario-viewing-all-test-results)
        - [Scenario: Filtering test results](#scenario-filtering-test-results)

## Development

- Clone the repo
- Verify node version see [.nvmrc](.nvmrc)
- Install dependencies

```sh
npm install
```

- Create a `.env` file in the root directory. The only required environment variable for the development environment is _SESS_SECRET_:

```env
SESS_SECRET=your_strong_session_secret
```

- (Optional) For other environment variables, refer to the [Docker Compose](./docker-compose.yml) file for their defaults and options.

> [!NOTE]
> This application connects to a MongoDB instance. You can provide a full connection string using _MONGODB_URI_, which will override other MongoDB-related variables.

- Run a MongoDB container

```sh
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

- Run the app (uses `nodemon`)

```sh
npm run dev:start
```

### Formatting and Linting

- This project uses `biome` for linting and formatting files
- All files except js and json files are formatted using prettier
- `Husky` is used as a dev dependency for pre-commit hooks that format and lint staged files see [.husky\pre-commit](.husky\pre-commit)

### With Docker

- To build and run docker container

```sh
# env variables are auto detected from .env file
docker compose up -d --build
```

- To stop the container

```sh
docker compose down
```

## Tech Stack and Architecture

### Backend

- **Node.js**: The core runtime environment for server-side JavaScript execution.
- **Express.js**: Web application framework for Node.js, providing robust routing and middleware support.
- **MongoDB**: NoSQL database for storing user and application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution for application data models.

### Frontend

- **EJS (Embedded JavaScript)**: Templating engine for generating HTML markup with plain JavaScript.
- **HTML/CSS**: Standard web technologies for structure and styling.
- **JavaScript**: Client-side scripting for enhanced interactivity.

### Architecture Pattern: MVC (Model-View-Controller)

The application follows the MVC architectural pattern:

1. **Model**:
   - Represents the data structure and business logic.
   - Implemented using Mongoose schemas and models for MongoDB interaction.
   - Handles CRUD operations for user data, license applications, and appointments.

2. **View**:
   - Responsible for presenting data to the user.
   - Implemented using EJS templates for dynamic content rendering.
   - Includes pages for dashboard, login, G2 application, and G application.

3. **Controller**:
   - Manages the flow of data between Model and View.
   - Handles user requests, processes data, and sends responses.
   - Implemented as Express.js route handlers and middleware.

### Additional Patterns and Technologies

- **Middleware**: Used for request processing, authentication, and error handling in Express.js.
- **RESTful API**: Follows REST principles for API design and resource management.
- **Asynchronous Programming**: Utilizes async/await and Promises for non-blocking I/O operations.
- **Form Validation**: Server-side validation for user inputs and data integrity.
- **Session Management**: For user authentication and maintaining user state.

### Development Tools

- **pnpm**: Package manager for Node.js dependencies.
- **Git**: Version control system for collaborative development.
- **Nodemon**: Development tool for auto-restarting the Node.js application during development.

This tech stack and MVC architecture provide a robust, scalable foundation for the driver testing system, allowing for clear separation of concerns and maintainable code structure.

## User Personas

### 1. Driver Applicant

**Name:** Sarah Johnson
**Age:** 18
**Occupation:** High School Student

**Background:**
Sarah is a recent high school graduate who is eager to gain her independence through driving. She has completed her learner's permit requirements and is now ready to apply for her G2 license.

**Goals:**

- To easily navigate the driver testing system and apply for her G2 license
- To track her application progress and receive timely updates
- To eventually progress to a full G license

**Challenges:**

- Limited experience with government systems and bureaucratic processes
- Anxiety about the testing process and potential for failure
- Balancing test preparation with other responsibilities

**Needs:**

- Clear, step-by-step guidance through the application process
- Easy-to-understand information about requirements and test expectations
- Ability to practice and prepare for the test within the system

### 2. Driving Examiner

**Name:** Michael Chen
**Age:** 35
**Occupation:** Certified Driving Examiner

**Background:**
Michael has been a driving examiner for 7 years. He is detail-oriented and takes his responsibility of ensuring road safety seriously.

**Goals:**

- To efficiently manage and conduct driving tests
- To provide fair and accurate assessments of drivers' skills
- To maintain a high standard of road safety through thorough examinations

**Challenges:**

- Managing a high volume of tests each day
- Ensuring consistency in test administration and scoring
- Dealing with nervous or unprepared test-takers

**Needs:**

- A streamlined system for viewing and managing test schedules
- Easy-to-use tools for recording test results and comments
- Quick access to applicant information and driving history

### 3. System Administrator

**Name:** Alex Rodriguez
**Age:** 42
**Occupation:** DMV Systems Administrator

**Background:**
Alex has worked in IT for government agencies for over 15 years. They are responsible for managing and maintaining the driver testing system.

**Goals:**

- To ensure the system runs smoothly and efficiently
- To manage user accounts and access levels
- To generate reports and analyze data for process improvement

**Challenges:**

- Balancing system updates with minimal downtime
- Managing security and data privacy concerns
- Accommodating changes in regulations and testing requirements

**Needs:**

- Robust tools for user management and access control
- Flexible reporting and data analysis capabilities
- Ability to easily create and manage appointment slots
- System for monitoring and addressing technical issues

These personas represent the three main user types of the driver testing system: the driver applicant, the examiner, and the administrator. Each has unique goals, challenges, and needs that the system must address to provide a comprehensive and effective solution for driver licensing and testing.

## Requirements

### User Authentication

#### Feature: User Signup

As a new user
I want to create an account
So that I can access the driver testing system

##### Scenario: Successful signup

Given I am on the signup page
When I enter a unique username, matching passwords, and select a user type
And I submit the form
Then my account should be created
And I should be redirected to the login page

##### Scenario: Signup with mismatched passwords

Given I am on the signup page
When I enter a username and mismatched passwords
And I submit the form
Then I should see an error message
And I should remain on the signup page

##### Scenario: Signup with existing username

Given I am on the signup page
When I enter an existing username
And I submit the form
Then I should see an error message
And I should remain on the signup page

#### Feature: User Login

As a registered user
I want to log in to the system
So that I can access my account

##### Scenario: Successful login

Given I am on the login page
When I enter valid credentials
And I submit the form
Then I should be logged in
And I should be redirected to my dashboard

##### Scenario: Login with invalid credentials

Given I am on the login page
When I enter invalid credentials
And I submit the form
Then I should see an error message
And I should remain on the login page

### Driver Interface

#### Feature: G2 License Application

As a driver user
I want to apply for a G2 license
So that I can progress in my driving journey

##### Scenario: Submitting G2 application

Given I am logged in as a driver
When I navigate to the G2 page
And I fill in all required fields
And I upload two images
And I submit the form
Then my G2 application should be saved
And I should see a confirmation message

##### Scenario: Incomplete G2 application

Given I am logged in as a driver
When I navigate to the G2 page
And I fill in some but not all required fields
And I submit the form
Then I should see validation errors
And my entered data should be retained

#### Feature: G License Application

As a G2 license holder
I want to apply for a G license
So that I can become a fully licensed driver

##### Scenario: Submitting G application

Given I am logged in as a driver with a G2 license
When I navigate to the G page
And I see my pre-filled information
And I update allowed fields
And I submit the form
Then my G application should be saved
And I should see a confirmation message

### Examiner Interface

#### Feature: View Scheduled Tests

As an examiner
I want to view scheduled driving tests
So that I can prepare for my upcoming examinations

##### Scenario: Viewing all scheduled tests

Given I am logged in as an examiner
When I navigate to the examiner page
Then I should see a list of all scheduled driving tests

##### Scenario: Filtering tests by type

Given I am logged in as an examiner
When I navigate to the examiner page
And I select to filter by G2 tests
Then I should see only G2 scheduled tests

#### Feature: Conduct Driving Test

As an examiner
I want to record the results of a driving test
So that the system can update the driver's status

##### Scenario: Passing a driver

Given I am logged in as an examiner
When I select a scheduled test
And I enter comments about the test
And I mark the test as passed
And I submit the form
Then the driver's status should be updated to passed

##### Scenario: Failing a driver

Given I am logged in as an examiner
When I select a scheduled test
And I enter comments about the test
And I mark the test as failed
And I submit the form
Then the driver's status should be updated to failed

### Admin Interface

#### Feature: Create Appointment Slots

As an admin
I want to create appointment slots
So that drivers can book their tests

##### Scenario: Creating a new appointment slot

Given I am logged in as an admin
When I navigate to the appointment page
And I select a date and time
And I submit the form
Then a new appointment slot should be created

##### Scenario: Attempting to create a duplicate slot

Given I am logged in as an admin
When I navigate to the appointment page
And I select a date and time that already exists
And I submit the form
Then I should see an error message
And no new appointment should be created

#### Feature: View Test Results

As an admin
I want to view the results of completed tests
So that I can initiate the license issuance process

##### Scenario: Viewing all test results

Given I am logged in as an admin
When I navigate to the test results page
Then I should see a list of all completed tests with pass/fail status

##### Scenario: Filtering test results

Given I am logged in as an admin
When I navigate to the test results page
And I select to filter by passed tests
Then I should see only the tests that were passed
