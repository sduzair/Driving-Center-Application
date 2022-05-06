const mongoose = require( "mongoose" )
const bcrypt = require( "bcryptjs" )


const DriverSchema = new mongoose.Schema( {
  firstName: {
    required: [ true, 'Please provide first name' ],
    type: String,
  },
  lastName: {
    required: [ true, 'Please provide last name' ],
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  DOB: {
    required: [ true, 'Please provide date of birth' ],
    type: String,
  },
  address: {
    houseNumber: {
      required: [ true, 'Please provide house number' ],
      type: Number,
    },
    street: {
      required: [ true, 'Please provide street' ],
      type: String,
    },
    city: {
      required: [ true, 'Please provide city' ],
      type: String,
    },
    province: {
      required: [ true, 'Please provide province' ],
      type: String,
    },
    postalCode: {
      required: [ true, 'Please provide postal code' ],
      type: String,
    },

  },
  carMake: {
    required: [ true, 'Please provide car make' ],
    type: String,
  },
  carModel: {
    required: [ true, 'Please provide car model' ],
    type: String,
  },
  carYear: {
    required: [ true, 'Please provide car year' ],
    type: Number,
  },
  carPlatNumber: {
    required: [ true, 'Please provide car plate number' ],
    type: Number,
  },
  carLicenceNumber: {
    type: String,
    required: [ true, 'Please provide car licence number' ],
  },
  image1: {
    required: [ true, 'Please provide image 1' ],
    type: String,
  },
  image2: {
    required: [ true, 'Please provide image 2' ],
    type: String,
  },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },
  // "G" or "G2"
  appointmentType: {
    type: String
  },
  examinerComment: {
    type: String,
    validate: {
      validator: function( v ) {
        return v ? true : false
      },
      message: 'Please provide examiner comment'
    },
  },
  testResult: {
    type: Boolean,
  }
} )

DriverSchema.pre( "save", function( next ) {
  const driver = this
  bcrypt.hash( driver.carLicenceNumber, parseInt(process.env.BCRYPT_SALT_ROUNDS), ( error, hash ) => {
    driver.carLicenceNumber = hash
    next()
  } )
} )


DriverSchema.pre( 'findOneAndUpdate', function( next ) {
  this.options.runValidators = true
  next()
} )


const Driver = mongoose.model( "Driver", DriverSchema )

module.exports = Driver
