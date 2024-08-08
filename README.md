# Driving-Test-Center-Application-Project

![publish docker image workflow status](https://github.com/sduzair/Driving-Test-Center-Application-Project/actions/workflows/publish-docker-image.yml/badge.svg)

![ci workflow status](https://github.com/sduzair/Driving-Test-Center-Application-Project/actions/workflows/ci.yml/badge.svg?branch=main)

- [Driving-Test-Center-Application-Project](#driving-test-center-application-project)
  - [Development](#development)
    - [Formatting and Linting](#formatting-and-linting)
    - [With Docker](#with-docker)
  - [Requirements](#requirements)
    - [Mainly entire application consists of following parts](#mainly-entire-application-consists-of-following-parts)
    - [Node Project Setup and Add Routing](#node-project-setup-and-add-routing)
    - [MongoDB setup, Data Model and CRUD operation](#mongodb-setup-data-model-and-crud-operation)
    - [User Authentication](#user-authentication)
    - [Appointment Creation and Appointment selection](#appointment-creation-and-appointment-selection)
    - [Driving Tests](#driving-tests)
    - [Mongoose Validation Checks](#mongoose-validation-checks)
    - [Assumptions](#assumptions)

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

## Requirements

### Mainly entire application consists of following parts

1. Driver Interface (a person who wants to take G2/G license)
2. Examiner Interface (a person who takes driver’s exam)
3. Admin (a person who adds schedules and other stuff in the portal)

### Node Project Setup and Add Routing

- Create a Node.js project template and add page routes
- Add View folder and create empty page template, user should be able to
  navigate from one page to another page
- Create a driver interface (In this part you will not implement Data Saving)
- You will be creating four views
- Dashboard – simple greeting message and navigation options to navigate to Login,
  G2_page, or G_page
- Login –
  - you will not be working on this, but it would be simple place holder for now
  - You will develop this later, and it offers both sign up and login functionality on
    the same page
  - You can add username/ password field on the page for now – no other action
    for now
- G2_Page – You will use this to enter your data – again no need to save data for now (Just create UI only)
  - First Name
  - Last Name
  - UserID – Any Unique ID (It is upto you)
  - DOB – must be a date field – May be add Calendar widget
  - Address – must be an object field (ie house no, street name, city, province, postal code)
  - Car details – again an object field (ie make, model, year, plat number)
  - License Number – must be 8 characters (alpha numeric)
  - Submit button – submit request
- G_Page – You will enter only your ID so that it pulls the data from the DB
  - Text box to input (UserID or License Number)
  - If the information is correct, it pulls data and display in form (No need to
    implement for this now)
  - Simply it pulls data that you entered from G2_page (No need to implement for
    this now)
- Use the EJS templating engine to create all four views
- Note: In this you are not offering to save data to DB
  Summary: Allow the user to navigate from one page to another page, using
  appropriate routing.

### MongoDB setup, Data Model and CRUD operation

- Day 1 (Week 4):
  - Create MongoDB account, use connection string and mongoose to connect to DB. Add
    User Model, may be with few fields only.
- Day 2: [Week 5]:
  - From G2_page, add data to Database. For this part, you may add FirstName, LastName,
    UserID, DOB only. (You will establish proof of concept by adding small piece to data from
    UI into DB)
  - Now when user clicks on Save button, it will save the data to Database.
- Day 3 [Week 6]: Due
  - You will start from where you left previously
  - Allow user to enter data in G2_page and save them in User Collection
  - For time being, you can allow to enter duplicate UserID (later we will make it Unique)
  - Create appropriate User Model to save data (Firstname, Lastname, UserID, DOB, Address, Car details, License Number). Note: add data in appropriate format, ie DOB should be Date format
  - On the G_page, you ask user to enter UserID, previously entered from G2_page
  - Fetch information from User Collection and display on G_page, User will enter Unique ID to fetch data from DB
  - If No UserID found, take user to G2_page and display message “No User Found”
  - On the G_page add appropriate text boxes so that you can display address, car information etc
  - Allow user to modify address, car information etc from G_page, and save them to Database if user updates them. Simply overwrite the previous data
  - Also make sure you add simple validation check on the data
  - Do not allow to modify Name, DOB, UserID, License No
  - Also modify the UI of G2_page and allow user to upload the images – atleast two images
    Summary: Allow user to enter data from G2 page, save them to DB and
    fetch those data from G page, and allow to update them. CRUD operation.

### User Authentication

- Day 1 (Week 6):
  - Modify your code and add data encryption on License Number and save them to DB
- Day 2: [Week 9]:
  - Modify login page, Add signup/login.
  - When user selects SignUp => ask username, password, repeated password
  - Also create a dropdown list UserType: Driver, Examiner, Admin
  - From SignUp menu, user can enter username, password, repeated password, UserType
  - Save the data in User Collection – make sure password is encrypted, you don’t need to
    save password two times
  - When you save data make sure you encrypt password, no need to save repeated
    password
  - For this you need to update the User Model, so that you can add username, password
    and UserType fields
  - You also need to modify your user model, so that at the time of signup you allow certain
    default value tobe added automatically to User Collection (firstname, lastname,
    LicenseNo, Car Info, Address)
- Day 3: [Week 10] Due
  - Start rearranging code appropriately in MVC pattern
  - Now you have completed signup part
  - Once signup is successful ask user to login
  - When user selects Login => ask for username, password
  - If login is successful, now show the navigation option for G2_page, G_page, if the UserType is Driver (Ref: Book page: 95)
  - Now after successful Login Only UserType = Driver can access the G2_Page, G_page. Appropriately protect the path/routes
  - By now you can understand that previously entered User data is of NO USE. You may goto DB and delete previous entry.
  - Now if you visit the G2_page and if License No is default value, You present the empty G2_page where User can enter the information
  - You also need to modify G_page, and remove search option based on License No
  - Simply display data on G_page based on Login user’s id (MongoDB object ID)
  - Again, if the LicenseNo is default, you can assume that User has not entered information from G2_page and take user to G2_page
  - By now both G2_page and G_page would check if the License No is default, then take user to G2_page and offer to add all the information
  - If login is unsuccessful ask user to signup first
  - Also make sure G2_page & G_page is authenticated and only accessible by Driver only, for this you need to add user_id (MongoDB Object ID) and user_UserType into browser’s session (Ref: Book page: 95 - 96)
  - You need to modify the way you save data from G2_page, previously you were Inserting data into Database. Now due to login functionality you will update the user data and offer to save extra items to User Collection. User is already created in SignUp. You could only be able to access G2_page, G_page only after login. Both pages are protected now using User Authentication. You will update the User data in DB based on user_id (MongoDB) you received in login step.
  - If user have already entered G2 data, and login again you may show those data on G2 page or offer completely blank page so that user can enter G2 data again. And you can overwrite them in DB
  - You can keep the functionality of G_page as it is, but allow to be accessed by login user and UserType = Driver
  - Also incorporate validation mechanism and display common input errors (duplicate username, empty field, License number length etc)
  - You can assume that user is selecting only “Driver” – UserType from dropdown list on the SignUp page
    Summary: You will add user authentication and protest G2_page, G_page, so
    that only login User with UserType= Driver can access this page

### Appointment Creation and Appointment selection

- We will add one more userType = “Admin” and allow him to create drive test appointment slots, later Drivers can pick one of the slot and book drive test appointment.
- Day 1: (Week 10)
  - Add new view to the application – appointment (No need to anything right now)
  - For now, this page is also protected using user authentication, but it is only accessible UserType = “Admin” (Ref: Book page: 95)
  - For this you need to add one more navigation option once user login.
  - If user is login and UserType = “Driver”, they see G2_page, G_page navigation option
  - If user is login and UserType = “Admin”, they see only Appointment option
  - Also modify authMiddleware so that one applies to Driver type, and another applies to Admin type (Page ref: 97, 98). You may choose to add two middleware.
- Day 2: (Week 11):
  - Create appointment View
  - From the appointment page Admin can add appointment slots only
  - Ie for One date there are many appointment slots can be offered (9:00 am – 2:00 pm), ie appointment times can be 9:00, 9:30, 10:00…..
  - Simply try to create prototype first,
  - You can save the data in Appointment collection, you can save each appointment slot separately ({date: <your date>, time: <time slot>}), it doesn’t matter how you save time, best thing is saved as string (“9:00”)
  - You need to add new data Model => Appointment
  - Ie [
    {date: <01-01-2022>, time: “9:00”},
    {date: <01-01-2022>, time: “9:30”}
    ]
  - To achieve this, don’t allow admin to enter time manually, simply display time as button or some other way
- Day 3: (Week 12)
  - From the Appointment view Admin is creating appointment slots only
  - Refine the Appointment page, don’t allow Admin to add same time slot for given date
  - Once time slot is added, gray out that button so that Admin will not add same time multiple times etc
  - Make sure you don’t add same time for the same date (avoid duplicate appointment)
  - Now modify G2_page so when user visit this page, they can see the available time slots for current date
  - For this you can add calendar to pick the Date on G2_page
  - Once the date is selected, display the appointment slots added by Admin
  - To make this work, please add few dates and time from Appointment Add view (as an admin user)
  - User can pick the appointment time from G2_page and book an appointment
  - You need to modify the User Collection to store the Appointment ID, this way you can establish link between User and Appointment collection
  - Also, you need to update the Appointment record and add some flag to verify that time slot is available for booking or not ie isTimeSlotAvailable = false
  - Ie You Appointment Model would look like this:
    {
    Date: <your date>,
    Time: <your time>,
    isTimeSlotAvailable: <true/false>
    }
  - Now if isTimeSlotAvailable is false you don’t show them on G2_page, It means that time slot is already booked
    Summary: You allow the admin user to enter appointment time slot, later display those time slots on Driver’s and driver can select those and book appointment time slot

### Driving Tests

- Start updating functionality, add anything missing from the previous requirements
- Please put more efforts in having all previous requirements done
- Now modify G page so that user can pick the time slot and book an appointment,
- Add Examiner side of view in the application
- Modify the Login UI, so that now from drop down user can select Examiner as well
- Add newer middleware so that newer view can only be accessed by Examiner only
- If you signup as driver you can see G2_page, G_page
- If you signup as examiner you can see Examiner tab
- If you signup as Admin you can see Appointment tab
- On the examiner page you can see the list of appointment or the driver ready for the drive test
- Also, Examiner may want to filter data to see only people looking to G2 test or G test
- For this to work, again you need to modify User collection, add one more field TestType
- If user adds data from G2_page => TestType = “G2”
- If user adds data from G_page => TestType = “G”
- Examiner pick one and it will display the details of the driver
- Display limited information about Driver ie (Name, Car details etc)
- Once driver is selected, Examiner may add comment about the Drive Test (At this point you may assume that Examiner took the drive test and offer comment etc)
- Also, Examiner could be able to mark Driver as Pass/Fail (Boolean variable to check if Driver passed the test or not)
- For this project, you need to modify User Model to hold TestType (G2 or G), Comment, Pass/Fail data
- Now you again modify the Admin view so that Admin can list pass/fail candidates so that he can issue order to create Driver License to external vendor. (You don’t need to worry about vendor part). Just add functionality so that Admin can list Pass/Fail candidates
- Now login with the same Driver whose DriveTest completed recently, and verify the comment added by Examiner and check the status PASS/FAIL

### Mongoose Validation Checks

- Signup
  - Same password check
  - Unique username required
  - All fields are required
- Login
  - If user does not exist user is asked to signup
  - All fields are required
- New Driver Form
  - All fields are required
- Existing Driver form
  - All fields are required
  - Driver allowed to change certain fields
- Every form retains the entered fields upon validation errors

### Assumptions

- Admin user creates appointment slots
- Driver user can book the slot for G or G2 test
- Once a slot is booked by a driver user for G or G2 test the slot is reserved
