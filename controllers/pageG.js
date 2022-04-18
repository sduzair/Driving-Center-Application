const Driver = require( "../models/Driver" )
const bcrypt = require( "bcryptjs" )

// a new driver user cannot visit this page before submitting details
module.exports = async function readDriverDetails( req, res ) {
  const serverTime = new Date().toLocaleString( 'en', {
    timeZone: 'America/Toronto'
  } )

  Driver.findOne( { userID: req.session.userId } )
    .populate( 'appointmentID' )
    .exec( ( error, driverObj ) => {
      if( error || !driverObj ) {
        res.status( 401 ).render( "driver/g_page", {
          driver: null,
          errors: error.errors
            ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
            : [ "Error finding driver!" ],
          serverMsgs: null,
          data: null,
          serverTime: null,
          appointmentDetail: null,
          appointmentType: null,
          testResult: null
        } )
      } else {
        bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
          if( same ) {
            const data = req.flash( 'data' )[ 0 ]
            return res.render( "driver/g_page", {
              driver: false,
              errors: req.flash( 'validationErrors' ),
              serverMsgs: data ? null : [ "Pls enter new driver details" ],
              data: data,
              serverTime: serverTime,
              appointmentDetail: null,
              appointmentType: null,

              testResult: null
            } )
          } else {
            const data = req.flash( 'data' )[ 0 ]

            const [ msgWhenAppointmentSlotTaken ] = req.flash( 'serverMsgs' )

            return res.render( "driver/g_page", {
              driver: driverObj,
              errors: req.flash( 'validationErrors' ),
              serverMsgs: data ? null : msgWhenAppointmentSlotTaken ? [ msgWhenAppointmentSlotTaken ] : null,
              data: data,
              serverTime: serverTime,
              appointmentDetail: driverObj.appointmentID,
              appointmentType: driverObj.appointmentType,
              testResult: {
                testResult: driverObj.testResult,
                examinerComment: driverObj.examinerComment
              }
            } )
          }
        } )

      }
    } )
}
