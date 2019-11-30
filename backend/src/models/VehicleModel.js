const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const VehicleSchema = mongoose.Schema({
   chassisId: {
     type: {
       series: String,
       number: Number
     },
     unique: true,
     index: true
   },
   type: {
     type: String,
     enum: ['BUS', 'CAR', 'TRUCK'],
     required: 'You should inform the vehicle type!'
   },
   passengers: {
     type: Number
   },
   color: {
     type: String,
     required: 'You should inform the vehicle color!'
   }
 }, {
   timestamps: true
 })

 VehicleSchema.plugin(uniqueValidator, {
   message: 'The given ChassisID already exists on database'
 })

 module.exports = mongoose.model('Vehicle', VehicleSchema)
