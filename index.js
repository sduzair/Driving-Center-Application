const express = require( "express" )
const path = require( "path" )
const ejs = require( "ejs" )
//for database
const mongoose = require( "mongoose" )
//for form multimedia data
const fileUpload = require( "express-fileupload" )
// for user session
const expressSession = require( "express-session" )
const flash = require( "connect-flash" )
// for development environment variables
// ! comment this line for dev env variables before deployment 
require( "dotenv" ).config()

const ONE_DAY = 1000 * 60 * 60 * 24
const {
  PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME,
  DB_PASSWORD,

  SESS_NAME = 'sid',
  SESSION_SECRET,
  SESS_LIFETIME = ONE_DAY,
} = process.env

const IN_PROD = NODE_ENV === 'production'

//middleware for validation
const validateUserSignup = require( "./middleware/validateSignup" )
const validateUserLogin = require( "./middleware/validateLogin" )
const driverAuthentication = require( "./middleware/driverAuthentication" )
const redirectIfAuthenticated = require( "./middleware/redirectIfAuthenticated" )
const adminAuthentication = require( "./middleware/adminAuthentication" )
const adminDriverAuthentication = require( "./middleware/driverAdminAuthentication" )
const examinerAuthentication = require( "./middleware/examinerAuthentication" )
//importing controllers
const driverFetch = require( "./controllers/driverFetch" )
const driverNew = require( "./controllers/driverNew" )
const pageHome = require( "./controllers/home" )
const pageDriverDashboard = require( "./controllers/pageDashboard" )
const pageG = require( "./controllers/pageG" )
const pageG2 = require( "./controllers/pageG2" )
const pageSignup = require( "./controllers/pageSignup" )
const pageLogin = require( "./controllers/pageLogin" )
const userSignup = require( "./controllers/userSignup" )
const userLogin = require( "./controllers/userLogin" )
const userLogout = require( "./controllers/userLogout" )
const pageAdminDashboard = require( "./controllers/pageAdminDashboard" )
const pageAdminAppointment = require( "./controllers/pageAdminAppointment" )
const appointmentNew = require( "./controllers/appointmentNew" )
const appointmentsFetch = require( "./controllers/appointmentsFetch" )
const driverBookAppointment = require( "./controllers/driverBookAppointment" )
const pageExaminerDashboard = require( "./controllers/pageExaminerDashboard" )
const driverFeedbackUpdate = require( "./controllers/driverFeedbackUpdate" )
const app = express()
app.set( "view engine", "ejs" )
app.use( express.static( "public" ) )
//for form data from POST request
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( fileUpload() )
app.use(
  expressSession( {
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false,
    },
  } ),
)
app.use( flash() )

app.use( "/users/signup", validateUserSignup )
app.use( "/users/login", validateUserLogin )
// todo: add auth middleware
app.use( "/drivers/bookAppointment", adminDriverAuthentication )

global.loggedIn = null
app.use( "*", ( req, res, next ) => {
  loggedIn = req.session.userType
  next()
} )


//mongodb database
mongoose.connect( "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@sandbox.tuank.mongodb.net/abc_driving_center",
  {
    useNewUrlParser: true,
  }
)

// routing
// driver authentication prevents any user other than 'Driver' from access
app.post( "/drivers/updateG2Driver", driverAuthentication, require( "./controllers/driverG2Update" ) )

app.post( "/drivers/updateGDriver", driverAuthentication, require( "./controllers/driverGUpdate" ) )

// app.post( "/driver/driver-details", driverAuthentication, driverFetch )

app.post( "/drivers/recordDriver", driverAuthentication, driverNew )

app.get( "/", pageHome )

app.get( "/index", pageHome )

app.get( "/drivers/dashboard-page", driverAuthentication, pageDriverDashboard )

app.get( "/drivers/g2-page", driverAuthentication, pageG2 )

app.get( "/drivers/g-page", driverAuthentication, pageG )

app.get( "/signup", redirectIfAuthenticated, pageSignup )

app.get( "/login", redirectIfAuthenticated, pageLogin )

app.post( "/users/signup", redirectIfAuthenticated, userSignup )

app.post( "/users/login", redirectIfAuthenticated, userLogin )

app.get( "/logout", userLogout )

app.get( "/admins/dashboard-page", adminAuthentication, pageAdminDashboard )

app.get( "/admins/appointment-page", adminAuthentication, pageAdminAppointment )

app.post( "/admins/appointments", adminAuthentication, appointmentNew )

app.get( "/admins/appointments/:month/:day/:year", appointmentsFetch )

app.get( "/admins/test-results-page", adminAuthentication, require( "./controllers/pageTestResults" ) )

app.post( "/drivers/bookAppointment", driverAuthentication, driverBookAppointment )

app.get( "/examiners/dashboard", examinerAuthentication, pageExaminerDashboard )

app.get( "/examiners/appointments-page", examinerAuthentication, require( "./controllers/pageAppointments" ) )

app.get( "/examiners/fetchAppointments/:filterType", examinerAuthentication, require( "./controllers/examinerFetchByAptType" ) )

app.post( "/examiners/update/driver/feedback", examinerAuthentication, driverFeedbackUpdate )



app.use( ( req, res ) => res.render( 'notfound' ) )

app.listen( PORT, () => {
  console.log( `Listening on port: ${ PORT }` )
} )

